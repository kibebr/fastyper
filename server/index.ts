import Koa from 'koa'
import Router from 'koa-router'
import { fold, map as emap, isRight } from 'fp-ts/Either'
import { map as tmap } from 'fp-ts/Task'
import { identity, pipe } from 'fp-ts/function'
import { getAll } from './lib/controllers/web/UserController'
import { getAll as getAllWordLists, getById } from './lib/controllers/web/WordListController'

const app = new Koa()
const router = new Router()

router.get('/users', async (ctx, next) => {
  const { code, body } = await getAll()()

  ctx.status = code
  ctx.body = body

  await next()
})

router.get('/users/:username', async (ctx, next) => {

  ctx.status = 200
  ctx.body = { nada: 'a' }

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

app.listen(3002, () => {
  console.log('Started!')
})
