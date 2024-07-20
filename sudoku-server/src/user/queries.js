const checkNameExists = 'SELECT s FROM users s WHERE s.name = ?';
const getUsers = 'SELECT * FROM users';
const addUser = 'INSERT INTO users (name, password) VALUES (?, ?)';
const getUserByNamePassword = 'SELECT * FROM users WHERE name = ? AND password = ?';
const getIdUserByName = 'SELECT id FROM users WHERE name = ?';
const getNameById = 'SELECT name FROM  users WHERE id = ?'

module.exports = {
    checkNameExists,
    getUsers,
    addUser,
    getUserByNamePassword,
    getIdUserByName,
    getNameById
}