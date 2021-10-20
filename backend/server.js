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

  res.json({
    message: 'Something went wrong, try again',
  })
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

  newsBlocksId.forEach((id) => {
    newsBlocks.push(router.db.get('articles').value()[router.db.get('articles').value().length - id])
  })
  res.json({
    newsBlocks: newsBlocks
  })
});

// Create New Article
server.post('/create', (req, res) => {
  const data = req.body;

  let yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))

  router.db.get('articles').unshift({
    id: router.db.get('articles').value().length + 1,
    source: data.source,
    tags: data.tags,
    author: data.login,
    title: data.title,
    description: data.description,
    coverImage: data.coverImage,
    publishedAt: yourDate.toISOString().split('T')[0],
    content: data.content,
  }).write()

  router.db.get('users').splice(data.id-1, 1, {
    ...router.db.get('users').value()[data.id-1],
    newsBlocksId: [...router.db.get('users').value()[data.id-1].newsBlocksId ,router.db.get('articles').value().length]
  }).write()

  res.json({
    message: "Successful"
  })
})

// Количество статей
server.get('/getlength', (req, res) => {
  res.json({
    message: "Successful",
    length: router.db.get('articles').value().length
  })
})

// Default json-server behaviour
server.use(router);

// Launch server
server.listen(5500, () => {
  console.log('JSON server is running');
});
