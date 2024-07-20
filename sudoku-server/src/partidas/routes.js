const { Router } = require('express');
const controller = require('./controller');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require('cors');
const bodyparser = require("body-parser");

const router = Router();

function verificaJWT(req, res, next) {
    //recuperar o token do cabeçalho
    let cabeçalhos = req.headers["authorization"].split(" ");
    let token = cabeçalhos[1];

    if(!token){
        return res.status(401).json({
            autenticado: false,
            mensagem: "Token não fornecido / mal formatado"
        })
    }
    //descriptografar o token
    const privateKey = fs.readFileSync("./private.key", "utf8");

    jwt.verify(token, privateKey, {algorithm: ["RS256"]}, (erro, tokenDecodificado)=>{
        if(erro){
            return res.status(401).json({
                autenticado: false,
                mensagem: "Token inválido"
            })
        }
        console.log(tokenDecodificado);
        req.usuario = tokenDecodificado.usuario;
        next();
    })
}

router.use(cors())
router.get('/', verificaJWT, controller.getPartidas);
router.get('/:user_id', verificaJWT, controller.getPartidaByUserId);
router.post('/', verificaJWT, controller.addParida);

module.exports = router;