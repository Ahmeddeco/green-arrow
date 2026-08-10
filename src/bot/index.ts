
import { weatherWorkflow } from './workflows/weather-workflow'
import { weatherAgent } from './agents/weather-agent'
import { agricultureAgent } from "./agents/agriculture-agent"
import { MastraEditor } from '@mastra/editor'
import { stagehandAgent } from "./agents/stagehand-agent"
import { browserAgent } from "./agents/browser-agent"
import { Mastra } from "@mastra/core"
import { agricultureWorkflow } from "./workflows/agriculture-workflow"
import { agricultureTreatmentWorkflow } from "./workflows/agriculture-treatment-workflow"
import { chatRoute } from "@mastra/ai-sdk"
import { storage } from "./storage"

export const mastra = new Mastra({
  workflows: { weatherWorkflow, agricultureWorkflow, agricultureTreatmentWorkflow },
  agents: { weatherAgent, agricultureAgent, stagehandAgent, browserAgent },
  editor: new MastraEditor(),
  storage,
  server: {
    apiRoutes: [
      chatRoute({
        path: '/chat',
        agent: 'agricultureAgent',
      }),
    ],
  },
})
