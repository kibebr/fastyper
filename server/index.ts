import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import dotenv from 'dotenv'

dotenv.config()

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify()

const start = async () => {
  try {
    await server.listen(process.env.PORT as string, '0.0.0.0')
  } catch (err) {
    console.error(err)
    server.log.error(err)
    process.exit(1)
  }
}

start()
