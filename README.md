# 🚀 Next.js 16 Application

A modern, scalable **Next.js (App Router)** application built with clean architecture, reusable components, global state management, and robust form validation.

---

## ⚙️ Core Technologies

The application is built using the following core technologies:

- ⚡ **Next.js** – React framework for building scalable web applications  
- 🟦 **TypeScript** – Strongly typed JavaScript for better maintainability  
- 🎨 **Tailwind CSS** – Utility-first CSS framework for rapid UI development  

---

## 🧠 State Management

Global state management is handled using **Zustand**, a lightweight and scalable state management solution.

### Key Benefits:
- Minimal setup and boilerplate  
- High performance with selective re-renders  
- Easy integration with React components  
- Built-in persistence support (sessionStorage)  

### Usage Example:

```ts
const user = useAuthStore((state) => state.user);
const token = useAuthStore((state) => state.token);

## 🧾 Form Management & Validation

The application uses **React Hook Form** for efficient form handling and **Zod** for schema-based validation.

### Features:
- Performant form state management  
- Minimal re-renders  
- Schema-based validation using Zod  
- Type-safe form handling with TypeScript  
- API Layer (Axios + interceptors) 

### Validation Example:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(6, "Minimum 6 characters required"),
});

## 🎨 UI Components

The application includes a set of reusable and scalable UI components designed for consistency and maintainability.

### Available Components:

- **CustomTable**
  - Dynamic columns and data rendering
  - Column-based sorting (ASC / DESC)
  - Status badges (COMPLETED / INCOMPLETE / MISSING)
  - Action handling (View / Update / Create)

- **CustomButton**
  - Supports loading state
  - Disabled state handling
  - Reusable across forms and actions

- **CustomInput**
  - Integrated with React Hook Form
  - Displays validation errors
  - Reusable form input component

- **CustomDropdown**
  - Styled select component with custom arrow
  - Supports dynamic options
  - Clean UI using Tailwind CSS

- **Pagination**
  - Page navigation support
  - Rows per page selection
  - Reusable across data tables

---

### Example Usage

```tsx
<CustomButton
  title="Submit"
  loading={loading}
  disabled={!isValid}
/>

<CustomTable
  columns={columns}
  data={data}
/>

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/masoodf59/TickTock.git
cd TickTock
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your API base URL:
```env
NEXT_PUBLIC_BASE_URL=""
```

5. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically