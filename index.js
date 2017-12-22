/**
 * Created by GanChao on 2017/12/7.
 */

const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {};

handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.start(router.route, handle);