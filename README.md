<a href="https://aifocus.sh/">
  <img alt="AIfocus.sh - AI tools library." src="./public/images/readme-image.jpeg">
  <h1 align="center">AIfocus.sh - AI tools library</h1>
</a>

<p align="center">
  An UI for text generation, specialized in the generation of content for social networks and articles.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#deploy-on-vercel"><strong>Deploy on Vercel</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- [Ollama and Llama3](https://ollama.com/library/llama3)
- [Recharts](https://recharts.org/en-US/) for chart generation
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Lucide](https://lucide.dev/icons/)
- History, rate limiting, and session storage with [MongoDB Atlas Database](https://www.mongodb.com/products/platform/atlas-database)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication


## Model Providers

This template ships with Llama3 as the default. However, thanks to the [Vercel AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co), or using [LangChain](https://js.langchain.com) with just a few lines of code.

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Authors

This library is created by [Ivan Montes](https://vercel.com) and [Next.js](https://nextjs.org) team members, with contributions from:

- Iván Montes ([@iandres_montes](https://twitter.com/iandres_montes)) - [La Silla Vacía](https://www.lasillavacia.com/)

