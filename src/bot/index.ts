
import { Mastra } from '@mastra/core/mastra'
import { LibSQLStore } from '@mastra/libsql'
import { MastraCompositeStore } from '@mastra/core/storage'
import { weatherWorkflow } from './workflows/weather-workflow'
import { weatherAgent } from './agents/weather-agent'
import { agricultureAgent } from "./agents/agriculture-agent"


export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, agricultureAgent },
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: "mastra-storage",
      url: "file:./mastra.db",
    }),
  }),
})
