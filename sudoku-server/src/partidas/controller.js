const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries');

const getPartidas = (req, res) =>{
    pool.query(queries.getPartidas, (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    })
}

const getPartidaByUserId = async (req, res) =>{
    const id_user = (req.params.id_user)
    pool.query(queries.getPartidaByUserId, [id_user], (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    });
}

const addParida = (req, res) => {
    const { id_user, tempo_choosed, duracao } = req.body;
    pool.query(queries.addPartida, [id_user, tempo_choosed, duracao], (error, results) =>{
        if(error) throw error;
        res.status(201).send('partida created successfully');
        console.log('partida created successfully')
    })
}

module.exports = {
    getPartidas,
    getPartidaByUserId,
    addParida
}