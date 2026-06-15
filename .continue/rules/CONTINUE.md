# Project Guide & Context for AI Assistants

## 1. Project Overview

This project is a modern web application built with **Next.js (App Router)** and **TypeScript**. It integrates advanced agentic capabilities using the **Mastra** framework, alongside a robust backend powered by **Prisma** and **PostgreSQL**.

### Key Technologies

- **Framework**: Next.js 16 (React 19)
- **AI/Agents**: Mastra Framework, V1 SDK.
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: Better Auth.
- **Styling**: Tailwind CSS & Shadcn UI components.
- **State Management**: Zustand.
- **Validation**: Zod (integrated via `src/generated` and manual schemas) & Conform.

---

## 2. Getting Started

### Prerequisites

- Node.js (v18+)
- npm, pnpm, or yarn
- A running PostgreSQL instance

### Installation & Setup

1. Clone the repository.
2. Install dependencies: `pnpm install`
3. Environment variables: Create a `.env` file based on `.env.example`.
4. Database setup:
   - Run migrations: `pnpm push` (or `pnpm studio` to explore).
   - Seed the database: `pnpm seed`.
5. Development server: `pnpm dev`.

### Mastra Agent Dev

To run the agent/bot logic independently or in development mode:

- `pnpm mastra` runs the Mastra dev environment.

---

## 3. Project Structure

- `src/app`: Next.js application routes and layouts.
- `src/bot`: The heart of the AI features. Contains agents, tools, and workflows managed by Mastra.
- `src/components`: UI components organized into:
  - `ui`: Basic Shadcn primitives.
  - `shared`: Reusable business-logic components (e.g., ProductCards).
  - `layout`: Global elements like Header, Footer, Sidebars.
- `src/lib`: Core library configurations (Prisma client, Auth client, utility helpers).
- `src/logic`: Pure logic functions (currency conversion, slug generation).
- `src/schemas`: Zod validation schemas for forms and API inputs.
- `src/types`: Domain-specific TypeScript definitions.
- `src/generated`: Auto-generated types from Prisma and Zod transformations, Don't use zod from here.

---

## 4. Development Workflow

- **Coding Style**: Use functional components with Tailwind CSS for styling.
- **State Management**: Use Zustand for global state; local state should use standard React `useState`/`useReducer`.
- **Validation**: Always use the schema in `src/schemas` when creating new forms or API endpoints.
- **Forms**: Use `@conform-to/react` to create a form with validation.
- **Testing**: Unit tests are managed via Vitest; E2E tests are managed via Playwright.

---

## 5. Key Concepts

- **Agents**: Managed in `src/bot`. They can perform tools (e.g., `weather-tool`) or execute complex workflows.
- **Database Schema**: Defined in `prisma/schema.prisma`. Changes here should trigger a `pnpm push` and any necessary updates to `src/generated`.
- **Authentication**: Powered by `better-auth`, integrated into the session management via `src/auth`.

---

## 6. Common Tasks

### Creating a new Page

1. Create a folder in `src/app` with a `page.tsx`.
2. Define any necessary Zod schemas in `src/schemas`.
3. Add corresponding components in `src/components/pages`.

### Adding a New Tool to the AI Agent

1. Define the tool logic in `src/bot/tools`.
2. Register the tool in the relevant agent file within `src/bot/agents/`.
3. Update any necessary workflows in `src/bot/workflows/`.

---

## 7. Troubleshooting

- **Prisma Issues**: If types are out of sync, run `pnpm prisma generate`.
- **Environment Variables**: Ensure your `.env` file is correctly populated before starting the dev server.
- **CORS/Auth Errors**: Verify the authentication URLs and secrets in the environment configuration.

---

## 8. References

- [Mastra Documentation](https://mastra.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
