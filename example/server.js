var reStore = require('../lib/restore'),
    store,
    server;

var type = process.argv[2];

if (type === 'redis')
  store = new reStore.Redis({database: 3});
else
  store = new reStore.FileTree({path: __dirname + '/tree'});

server = new reStore({
  store:  store,
  http:   {port: 80},
  https:  {
    force:  true,
    port:   443,
    cert:   __dirname + '/ssl/server.crt',
    key:    __dirname + '/ssl/server.key'
  },
  allow: {
    signup: true
  },
  cacheViews: false
});

server.boot();
