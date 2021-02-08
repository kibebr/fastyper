import Koa from 'koa'
import Router from 'koa-router'
import { Parser, Route, Response, URL, route } from 'typera-koa'
import * as t from 'io-ts'

const app = new Koa()
const router = new Router()

router.get('/users/:username', async (ctx, next) => {
  ctx.status = 200
  ctx.body = { msg: 'test' }
  console.log(ctx.params)

  await next()
})

app.use(router.routes())

app.listen(3002, () => {
  console.log('Started!')
})
