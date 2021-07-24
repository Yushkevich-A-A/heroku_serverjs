const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { Ticket } = require('./Ticket');
const { TicketController } = require('./TicketController');
const app = new Koa();

const controller = new TicketController();
const ticketFirst = new Ticket(
    'поменять краску в принтере. пом 404',
    'полное описание первой заявки'
    );
const ticketSecond = new Ticket(
    'Переустановить Windows, ПК-Hall24',
    'очень полное описание второй заявки'
    );

const ticketThird = new Ticket(
    'Установить обновление KB-XXXX',
    'Вышло критическое обновление для Windows, нужно поставить обновления в следующем приоритете\r\n1. Сервера (не забыть сделать бэкап)\r\n2. Рабочие станции',
    true
    );

controller.addTicket(ticketFirst);
controller.addTicket(ticketSecond);
controller.addTicket(ticketThird);

app.use( koaBody({
    urlencoded: true,
    multipart: true,
}));

const port = process.env.PORT || 7070;

app.use(async ctx => {

    let data = null;
    if (ctx.method === 'GET') {
        data = ctx.request.query;
    } else if (ctx.method === 'POST') {
        data = ctx.request.body;
    }
    const { method, id, brief, full } = data;

    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    });

    switch (method) {
        case 'allTickets':
            const arr = controller.getAllTickets();

            ctx.response.body = arr;
            ctx.response.status = 200;
            return;

        case 'getFullDescTicket':
            ctx.response.body = controller.getTicket(parseInt(id));
            ctx.response.status = 200;
            return;

        case 'createTicket':
            ctx.response.body = controller.addTicket(new Ticket(brief, full));
            ctx.response.status = 200;
            return;

        case 'editTicket':
            ctx.response.body = controller.editTicket(parseInt(id), brief, full);
            ctx.response.status = 200;
            return;

            
        case 'deleteTicket':
            ctx.response.body = controller.deleteTicket(parseInt(id));
            ctx.response.status = 200;
            return;


    //     // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});

const server = http.createServer(app.callback()).listen(port);