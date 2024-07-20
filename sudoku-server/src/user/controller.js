const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res) =>{
    pool.query(queries.getUsers, (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    })
}

const getUserByNamePassword = async (req, res) =>{
    const name = (req.params.name);
    const password = (req.params.password)
    pool.query(queries.getUserByNamePassword, [name, password], (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    });
}

const addUser = (req, res) => {
    const { name, password } = req.body;
    pool.query(queries.addUser, [name, password], (error, results) =>{
        if(error) throw error;
        res.status(201).send('user created successfully');
        console.log('user created successfully')
    })
}

const getIdUserByName = async (req, res) =>{
    const name = (req.params.name);
    pool.query(queries.getIdUserByName, [name], (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    });
}

const getNameById = async (req, res) =>{
    const id = (req.params.id);
    pool.query(queries.getNameById, [id], (error, results) =>{
        if(error) throw error;
        res.status(200).json({
            data: results
        });
    });
}

module.exports = {
    getUsers,
    addUser,
    getUserByNamePassword,
    getIdUserByName,
    getNameById
}