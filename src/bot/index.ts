
import { Mastra } from '@mastra/core/mastra'
import { LibSQLStore } from '@mastra/libsql'
import { MastraCompositeStore } from '@mastra/core/storage'
import { weatherWorkflow } from './workflows/weather-workflow'
import { weatherAgent } from './agents/weather-agent'
import { agricultureAgent } from "./agents/agriculture-agent"
import { MastraEditor } from '@mastra/editor'
import { stagehandAgent } from "./agents/stagehand-agent"
import { browserAgent } from "./agents/browser-agent"

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, agricultureAgent, stagehandAgent, browserAgent },
  editor: new MastraEditor(),
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: "mastra-storage",
      url: "file:./mastra.db",
    }),
  }),
})
