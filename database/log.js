const db = require('./database');

function logToDB(req, imageLinks) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const date = new Date().toISOString();
    for (let link of imageLinks) {
        console.log(link)
        db.run(`INSERT INTO logs (ip, user_agent, date, image_link) VALUES (?, ?, ?, ?)`, [ip, userAgent, date, link]);
    }
}

module.exports = logToDB;
