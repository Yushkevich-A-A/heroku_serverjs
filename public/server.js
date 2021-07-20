const http = require('http');
const Koa = require('koa');
const { default: Ticket } = require('./Ticket');
const { default: TicketController } = require('./TicketController');
const app = new Koa();

const controller = new TicketController();
const ticketFirst = new Ticket('первая заявка', 'полное описание первой заявки', true);
const ticketScond = new Ticket('вторая заявка', 'очень полное описание второй заявки')

controller.addTicket(ticketFirst);
controller.addTicket(ticketScond);

app.use(koaBody({
    urlencoded:true,
}));


app.use(async ctx => {
    const { method, id = null} = ctx.request.query;
    console.log(ctx.request.query);

    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    })

    ctx.response.body = 'Hello woo!';
    // switch (method) {
    //     case 'allTickets':
    //         ctx.response.body = controller.allTickets();
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
    //     // TODO: обработка остальных методов
    //     default:
    //         ctx.response.status = 404;
    //         return;
    // }
});

const server = http.createServer(app.callback()).listen(7070);