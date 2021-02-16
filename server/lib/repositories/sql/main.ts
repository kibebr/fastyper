import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

export const db = new Pool({
  connectionString: process.env.NODE_ENV === 'development' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
})

