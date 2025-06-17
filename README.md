This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technical details

This project uses a mix of: zustand, tailwind, shadcn and nextjs to create a closer as possible solution of what was requested [of the FE engineer take home test](https://stack-ai.notion.site/Take-at-Home-Task-Frontend-Engineer-KB-020c24ea42eb40a4bf8f3ea6b54cc83d)

#### A list of the most relevants bits
* Everything connects together at the: `components/screens/Explorer.tsx`.
* The most important parts of the logic are inside hooks that handle different aspects of the app:
  * API hooks are inside `hooks/api`. 
  * The `useFetchResourceChildren` hook exposes a method named `fetchChildren` that has side effects by itself, because it will update the zustand store with the returned data. 
* The most heavily used store is the `useExplorerStore` that holds most of the data displayed in the FileExplorer section.
* The hook `useKnowledgeBaseStatusPollerEffect` is a useEffect hook that registers a very simple and dumb status poller for the folders currently open by the user. 
* There is a lot going on inside the `CreateKnowlegeBaseButton.tsx`.
* The `stores/utils.ts` is specially useful to make the FE abide by the rule from the `Knowledge_Base_Workflow.ipynb`:
  > It is important that the frontend contains logic to avoid passing both a resource and its children in the list of resources to be indexed


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
