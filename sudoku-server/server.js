const express = require('express');
const userRoutesUser = require('./src/user/routes')
const userRoutesPartida = require('./src/partidas/routes')
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('hello world');
})

app.use('/user', userRoutesUser);
app.use('/partida', userRoutesPartida)

app.listen(port, () => console.log(`app listening on port ${port}`));