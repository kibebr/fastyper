import Koa from 'koa'
import Router from 'koa-router'
import { Parser, Route, Response, URL, route } from 'typera-koa'
import * as t from 'io-ts'
import { map as emap, isRight } from 'fp-ts/Either'
import { map as tmap } from 'fp-ts/Task'
import { identity, pipe } from 'fp-ts/function'
import { getByUsername, getAll } from './lib/controllers/web/UserController'

const app = new Koa()
const router = new Router()

router.get('/users/:username', async (ctx, next) => {
  ctx.status = 200
  ctx.body = { msg: 'test' }
  const answer = await getAll()()
  console.log(answer)

  await next()
})

app.use(router.routes())

app.listen(3002, () => {
  console.log('Started!')
})
