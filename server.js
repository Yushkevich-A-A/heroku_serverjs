const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { Ticket } = require('./Ticket');
const { TicketController } = require('./TicketController');
const app = new Koa();

const controller = new TicketController();
const ticketFirst = new Ticket('первая заявка', 'полное описание первой заявки', true);
const ticketScond = new Ticket('вторая заявка', 'очень полное описание второй заявки')

controller.addTicket(ticketFirst);
controller.addTicket(ticketScond);

app.use( koaBody({
    urlencoded: true,
    multupart: true,
}));

app.use(async ctx => {
    const { method, id = null} = ctx.request.query;

    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    });

    // switch (method) {
    //     case 'allTickets':
    //         const arr = controller.getAllTickets();

    //         ctx.response.body = arr;
    //         ctx.response.status = 200;
    //         return;

    //     case 'Ticket':
    //         ctx.response.body = controller.getTicket(id);
    //         ctx.response.status = 200;
    //         return;

    //     case 'createTicket':
    //         ctx.response.body = controller.getTicket(id);
    //         ctx.response.status = 200;
    //         return;
    // //     // TODO: обработка остальных методов
    //     default:
    //         ctx.response.status = 404;
    //         return;
    // }

    ctx.response.body = 'ответ получен сервер локальный';
});


// const server = http.createServer((req, res) => {
//     console.log(req);
//     req.end('сервер запущен');
// })
// const port = 7070;

// server.listen(port, (err) => {
//     if (err) {
//         console.log('Произошла ошибка', err);
//         return;
//     }
//     console.log(`Server processed on ${port}`);
// })

const server = http.createServer(app.callback()).listen(7070);