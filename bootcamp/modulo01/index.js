const express = require('express');

const server = express();

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Diego", "email": "diego@rocketseat.com.br"}

//CRUD = Create, Read, Update, Delete


server.use(express.json());

const users = ['Diego', 'Claudio', 'Victor'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url};`);

    next();

    console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: "user name is required" });
    }

    return next();
}

function checkUserInArray (req, res, next) {
    if (!users[req.params.index]) {
        return res.status(400).json({ error: "user does not exists" });
    }

    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
})

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);

})

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
})

server.listen(4000);