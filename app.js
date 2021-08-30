const express = require("express");
const neo4jconnection = require('./models/neo4jconnection');
const app = express();

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/homepage.html')
})

app.get('/graph-tool', (req, res) => {
  res.sendFile(__dirname + '/views/graphvis.html')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login-form.html')
})

app.get('/login-icon.png', (req, res) => {
  res.sendFile(__dirname + '/login-icon.png')
})

app.get('/author.jpg', (req, res) => {
  res.sendFile(__dirname + '/author.jpg')
})



app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
 });

app.use('/models', neo4jconnection);

console.log('Server Up')

app.listen(2345)



