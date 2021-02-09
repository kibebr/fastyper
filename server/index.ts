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

router.get('/users', async (ctx, next) => {
  const answer = await getAll()()

  ctx.status = answer.code
  ctx.body = answer.body

  await next()
})

router.get('/users/:username', async (ctx, next) => {
  const answer = await getByUsername({ params: ctx.params })

  console.log(answer.toString())

  ctx.status = 200
  ctx.body = { hello: 'world' }

  await next()
})

app.use(router.routes())

app.listen(3002, () => {
  console.log('Started!')
})
