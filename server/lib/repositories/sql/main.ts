import { Pool } from 'pg'

export const db = new Pool({
  connectionString: 'postgres://postgres:geral00@localhost/fastyper-dev'
})

