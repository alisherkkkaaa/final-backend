const { Pool } = require('pg');
const pool = new Pool({
    user: "final_backend_socail_media_user",
    password: "yFm24IXHmf01tL3pIl2vTD36rZSjamO2",
    host: "dpg-cng6ek021fec73fauli0-a",
    port: 5432,
    database: "final_backend_socail_media"
});

module.exports = pool;