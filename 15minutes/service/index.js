const express = require('express');
const uuid = require('uuid');
const path = require('path');
const app = express();

let users = {};
let activities = {};


const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.use(express.json());
app.use(express.static('public'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


const apiRouter = express.Router();
app.use('/api', apiRouter);


function authenticateUser(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ msg: 'Authorization token missing' });
  }

  const user = Object.values(users).find((u) => u.token === token);
  if (!user) {
    return res.status(401).send({ msg: 'Invalid token' });
  }

  req.user = user; 
  next();
}


apiRouter.post('/auth/create', (req, res) => {
  const user = users[req.body.email];
  if (user) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const newUser = { email: req.body.email, password: req.body.password, token: uuid.v4() };
  users[newUser.email] = newUser;
  activities[newUser.email] = []; // Initialize user's activity array

  res.send({ token: newUser.token });
});


apiRouter.post('/auth/login', (req, res) => {
  const user = users[req.body.email];
  if (user && req.body.password === user.password) {
    user.token = uuid.v4();
    return res.send({ token: user.token });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

apiRouter.post('/activity', authenticateUser, (req, res) => {
  const userEmail = req.user.email;

  if (!activities[userEmail]) {
    activities[userEmail] = [];
  }

  activities[userEmail].push({
    activity: req.body.activity,
    timestamp: new Date(),
  });

  res.status(201).send({ msg: 'Activity logged successfully' });
});


apiRouter.get('/activity', authenticateUser, (req, res) => {
  const userEmail = req.user.email;
  res.status(200).send(activities[userEmail] || []);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
