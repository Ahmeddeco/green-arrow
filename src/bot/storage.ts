import { PostgresStore } from '@mastra/pg'

declare global {
  var pgStore: PostgresStore | undefined
}

function getPgStore(): PostgresStore {
  if (!global.pgStore) {
    global.pgStore = new PostgresStore({
      id: 'pg-storage',
      connectionString: process.env.DATABASE_URL!,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: true }
        : false,
    })
  }
  return global.pgStore
}

export const storage = getPgStore()
