const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Generate access token
function makeToken(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Use default middlewares (e.g. cors, logger)
server.use(middlewares);


// Parse json from request body
server.use(jsonServer.bodyParser);



// Protect admin paths
server.use((req, res, next) => {
  let authorized = false;

  if (req.method === 'GET' || req.path === '/login' || req.path === '/register') {
    next();
  } else {
    const token = req.headers.authorization;
    
    router.db.get('tokens').value().forEach((_token) => {
      if (token === 'Bearer ' + _token) {
        authorized = true;
        next();
      }
    });

    if (!authorized) res.sendStatus(401);
  }
});

// Admin authorization
server.post('/login', (req, res) => {
  const credentials = req.body;

  router.db.get('users').value().forEach((user) => {
    if (user.login === credentials.login && user.password === credentials.password) {
      // Generate token
      const token = makeToken(100);
      
      // Add token to DB
      router.db.get('tokens').push(token).write();

      res.json({
        token: token,
        message: 'User Authorized',
        userId: user.id
      });
    }
  });
});

// Registration
server.post('/register', (req, res) => {
  const credentials = req.body;

  let error = false

  router.db.get('users').value().forEach((user) => {
    if (user.login === credentials.login) {
      error = true
      res.json({
        message: 'User already exists',
      });
    }
  });

  if(!error) {

    router.db.get('users').push({
      id: router.db.get('users').value().length + 1,
      login: credentials.login,
      password: credentials.password,
      newsBlocksId: []}).write();

    res.json({
      message: 'User Created',
    });
  }
});

// News Blocks for Profile
server.post('/getnews', (req, res) => {
  let newsBlocksId = req.body
  let newsBlocks = []
  console.log(req.body)

  newsBlocksId.forEach((id) => {
    newsBlocks.push(router.db.get('articles').value()[id-1])
  })

  res.json({
    newsBlocks: newsBlocks
  })
});


// Default json-server behaviour
server.use(router);

// Launch server
server.listen(5500, () => {
  console.log('JSON server is running');
});
