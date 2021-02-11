import Koa from 'koa'
import Router from 'koa-router'
import { fold, map as emap, isRight } from 'fp-ts/Either'
import { map as tmap } from 'fp-ts/Task'
import { identity, pipe } from 'fp-ts/function'
import { getByUsername, getAll } from './lib/controllers/web/UserController'

const app = new Koa()
const router = new Router()

router.get('/users', async (ctx, next) => {
  const { code, body } = await getAll()()

  ctx.status = code
  ctx.body = body

  await next()
})

router.get('/users/:username', async (ctx, next) => {
  const { code, body } = pipe(
    getByUsername({ params: ctx.params }),
    fold(
      () => ({ code: 400, body: 'Missing or invalid parameter.' }),
      (x) => x
    )
  )

  ctx.status = code
  ctx.body = body

  await next()
})

app.use(router.routes())

app.listen(3002, () => {
  console.log('Started!')
})
