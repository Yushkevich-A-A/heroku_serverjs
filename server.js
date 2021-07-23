const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { Ticket } = require('./Ticket');
const { TicketController } = require('./TicketController');
const app = new Koa();

const controller = new TicketController();
const ticketFirst = new Ticket(
    'поменять краску в принтере. пом 404',
    ['полное описание первой заявки']
    );
const ticketSecond = new Ticket(
    'Переустановить Windows, ПК-Hall24',
    ['очень полное описание второй заявки']
    );

const ticketThird = new Ticket(
    'Установить обновление KB-XXXX',
    [
        'Вышло критическое обновление для Windows, нужно поставить обновления в следующем приоритете',
        '1. Сервера (не забыть сделать бэкап)',
        '2. Рабочте станции',
    ],
    true
    );

controller.addTicket(ticketFirst);
controller.addTicket(ticketSecond);
controller.addTicket(ticketThird);

app.use( koaBody({
    urlencoded: true,
    multupart: true,
}));

const port = process.env.PORT || 7070;

app.use(async ctx => {
    const { method, id } = ctx.request.query;
    console.log(id);
    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    });

    switch (method) {
        case 'allTickets':
            const arr = controller.getAllTickets();

            ctx.response.body = arr;
            ctx.response.status = 200;
            return;

        case 'ticket':
            const data = controller.getTicket(2);
            ctx.response.body = data;
            ctx.response.status = 200;
            return;

        // case 'createTicket':
        //     const data = controller.addTicket(id)
        //     ctx.response.body = controller.getTicket(id);
        //     ctx.response.status = 200;
        //     return;
    //     // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});

const server = http.createServer(app.callback()).listen(port);