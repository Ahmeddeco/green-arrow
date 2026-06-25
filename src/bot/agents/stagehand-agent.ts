import { StagehandBrowser } from '@mastra/stagehand'

import { Agent } from '@mastra/core/agent'
import { ollama } from 'ollama-ai-provider-v2'
import { Memory } from "@mastra/memory"

const browser = new StagehandBrowser({
  headless: true,
  model: {
    modelName: "gemma4:12b",
    baseURL: "http://localhost:11434/v1", // المسار المتوافق مع OpenAI في Ollama
    apiKey: "ollama" // قيمة صورية لأن Ollama لا يتطلب مفتاحاً حقيقياً
  }
})

export const stagehandAgent = new Agent({
  id: 'stagehand-agent',
  name: 'Stagehand Browser',
  model: ollama("gemma4:12b"),
  browser,
  instructions: `You are a web automation assistant.
`,
  memory: new Memory(),
})

