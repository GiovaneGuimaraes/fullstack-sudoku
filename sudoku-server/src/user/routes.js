const { Router } = require('express');
const controller = require('./controller');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require('cors');
const bodyparser = require("body-parser");

const router = Router();

router.use(cors())
router.get('/', controller.getUsers);
router.get('/:name', controller.getIdUserByName);
router.get('/:name/:password', controller.getUserByNamePassword);
router.post('/', controller.addUser);
router.post("/login", [bodyparser.json(), async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    let privateKey = fs.readFileSync("./private.key", "utf8");

    try {
        const resposta = await fetch(`http://localhost:3001/user/${name}/${password}`, {
        method: "GET",
        })
        if (!resposta.ok) {
            throw new Error('Network response was not ok ' + resposta.statusText);
        }
        const data = await resposta.json();
        console.log(data.data);
        if(data.data[0] == undefined){
            console.log("login invalido")
            return res.status(401).json(
                {
                    autenticado: false,
                    token: null
                }
            )
        } else{

            let token = jwt.sign({ name }, privateKey, {
                algorithm: "RS256",
                expiresIn: '100y'
            })
            return res.status(200).json(
                {
                    autenticado: true,
                    token: token
                }
            )
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return res.status(401).json(
            {
                autenticado: false,
                token: null,
            }
        )
    }
}])

module.exports = router;