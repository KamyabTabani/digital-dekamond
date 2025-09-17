# Next.js Client-Side Authentication Project

This is a test project demonstrating a simple client-side authentication flow using Next.js, TypeScript, and Tailwind
CSS. It features a login page with phone number validation and a protected dashboard page.

## Features

- **Login Page**: With client-side validation for Iranian mobile numbers.
- **Dashboard Page**: A protected route that displays user information.
- **Client-Side Auth**: Session management handled entirely on the client using `localStorage`.
- **Intelligent Routing**: The root page (`/`) directs users to login or the dashboard based on their auth state.
- **API Integration**: Fetches random user data on login.
- **Modern Tech Stack**: Built with the Next.js App Router, TypeScript, and modern tooling.
- **UI**: Clean, responsive UI built with Tailwind CSS and Shadcn/ui.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (v18.0 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/KamyabTabani/digital-dekamond.git]
   cd digital-dekamond
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── (auth)/         # Route group for auth pages
│   ├── (dashboard)/    # Route group for protected pages
│   ├── fonts/          # Fonts container
│   ├── globals.css     # Main css file of project
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Root page (redirects users)
├── components/
│   ├── ui/             # Shadcn UI components
│   └── providers.tsx   # React Query provider
├── hooks/
│   └── use-auth.ts     # Custom hook for auth logic
├── lib/
│   ├── api.ts          # API call functions
│   ├── utils.ts        # Shadcn utility functions
│   └── validators.ts   # Zod validation schemas
└── types/
    └── index.ts        # TypeScript type definitions
```
