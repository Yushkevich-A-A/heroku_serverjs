const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    console.log(ctx.request.query);
    ctx.response.body = 'server response';
})

const server = http.createServer(app.callback()).listen(7070);