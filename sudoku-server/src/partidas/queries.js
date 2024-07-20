const getPartidas = 'SELECT * FROM partidas';
const addPartida = 'INSERT INTO partidas (id_user, tempo_choosed, duracao) VALUES (?, ?, ?)';
const getPartidaByUserId = 'SELECT * FROM partidas WHERE user_id = ?';

module.exports = {
    getPartidas,
    addPartida,
    getPartidaByUserId
}