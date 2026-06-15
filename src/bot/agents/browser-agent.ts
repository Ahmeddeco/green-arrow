import { Agent } from '@mastra/core/agent'
import { AgentBrowser } from '@mastra/agent-browser'
import { ollama } from "ollama-ai-provider-v2"
import { Memory } from "@mastra/memory"

const browser = new AgentBrowser({ headless: true })

export const browserAgent = new Agent({
  id: 'browser-agent',
  name: 'Browser Agent',
  model: ollama("gemma4:12b"),
  browser,
  memory: new Memory(),
  instructions: `You are a web automation assistant.

When interacting with pages:
1. Use browser_snapshot to get the current page state and element refs
2. Use the refs (like @e1, @e2) to target elements for clicks and typing
3. After actions, take another snapshot to verify the result`,
})