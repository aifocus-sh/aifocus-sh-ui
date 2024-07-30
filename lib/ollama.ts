import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({
    baseURL: process.env.OLLAMA_BASE_URL,
})
export default ollama