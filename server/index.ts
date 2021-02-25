import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'
import { getAll as getAllWordLists, getById } from './lib/controllers/web/WordListController'
import { getAll as getAllUsers, getByUsername, postUser } from './lib/controllers/web/UserController'

dotenv.config()
const app = new Koa()
const router = new Router()

router.get('/users', async (ctx, next) => {
  const { code, body } = await getAllUsers()()

  ctx.status = code
  ctx.body = body

  await next()
})

router.get('/users/:username', async (ctx, next) => {
  const { code, body } = await getByUsername(ctx)()

  ctx.status = code
  ctx.body = body

  await next()
})

router.post('/users', bodyParser(), async (ctx, next) => {
  ctx.body = ctx.request.body
  console.log(ctx.body)
  const { code, body } = await postUser(ctx)()

  console.log(code, body)
  ctx.status = code
  ctx.body = body
  
  await next()
})

router.get('/wordlists', async (ctx, next) => {
  const { code, body } = await getAllWordLists()()
  
  ctx.status = code
  ctx.body = body

  await next()
})

router.get('/wordlists/:id', async (ctx, next) => {
  const { code, body } = await getById(ctx.params.id)()
  
  ctx.status = code
  ctx.body = body

  await next()
})


app.use(router.routes())
app.use(cors())

app.listen(process.env.PORT, () => {
  console.log('Started!')
})
