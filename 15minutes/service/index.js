const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let activities = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;
    activities[user.email] = []; 

    res.send({ token: user.token });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Add a completed activity
apiRouter.post('/activity', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    const userActivities = activities[user.email] || [];
    userActivities.push({ activity: req.body.activity, timestamp: new Date() });
    activities[user.email] = userActivities;
    res.status(201).send({ msg: 'Activity logged successfully' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get completed activities
apiRouter.get('/activities', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.query.token);
  if (user) {
    res.send(activities[user.email] || []);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
