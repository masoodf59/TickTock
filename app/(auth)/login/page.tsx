"use client";

import CustomInput from "@/components/CustomInput";
import { loginSchema, LoginSchemaType } from "@/lib/validations/loginSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authStore";
import { loginApi } from "@/lib/auth";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function LoginPage() {
    const setUser = useAuthStore((state) => state.setUser);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: LoginSchemaType) => {
        try {
            setLoading(true)
            let email = "abc@gmail.com";
            let passwrod = "123456"
            if (email == data.email && passwrod == data?.password) {
                const resp = {
                    user: {
                        id: 1,
                        name: "Masood",
                        email: "abc@gmail.com",
                    },
                    token: "abc123token",
                };
                // const payload={
                //     email:data?.email,
                //     password:data?.password
                // }
                //  const res = await loginApi(payload);
                setUser(resp.user, resp.token);
                toast.success("User login successfully")
                router.push("/dashboard");


            } else {
                toast.error('invalid credentils');
            }

        } catch (error: any) {
            const errorMessage = error?.message || error?.data?.message
            toast.error(errorMessage || "Invalid credentials")
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center bg-gray-50 px-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md"
                >
                    <p className="text-[20px] font-bold text-[#111928] mb-4">
                        Welcome back
                    </p>
                    <div className="mb-4">
                        <CustomInput
                            label="Email *"
                            type="text"
                            value={watch("email")}
                            placeholder="name@example.com"
                            onChange={(val) => setValue("email", val)}
                            error={errors.email?.message}
                        />
                    </div>

                    <div className="mb-4">
                        <CustomInput
                            label="Password *"
                            type="password"
                            value={watch("password")}
                            placeholder="********"
                            onChange={(val) => setValue("password", val)}
                            error={errors.password?.message}
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input type="checkbox" className="mr-2 border border-[#D1D5DB]" />
                        <span className="text-sm text-[#6B7280] font-medium">
                            Remember me
                        </span>
                    </div>
                    <CustomButton
                        title="Login"
                        loading={loading}
                        disabled={loading == true}
                        type="submit"
                    />


                </form>
            </div>

            {/* RIGHT SIDE (BLUE PANEL) */}
            <div className="hidden md:flex items-center justify-center bg-[#1C64F2] text-white px-10">
                <div className="max-w-xl">

                    <h1 className="text-[40px] font-semibold mb-4">
                        ticktock
                    </h1>

                    <p className="text-md leading-6 text-blue-100">
                        Introducing ticktock, our cutting-edge timesheet web
                        application designed to revolutionize how you manage
                        employee work hours. With ticktock, you can effortlessly
                        track and monitor employee attendance and productivity
                        from anywhere, anytime, using any internet-connected device.
                    </p>

                </div>
            </div>

        </div>
    );
}