import mysql from 'mysql2/promise'

const host = process.env.MYSQL_ADDON_HOST
const user = process.env.MYSQL_ADDON_USER
const database = process.env.MYSQL_ADDON_DB
const password = process.env.MYSQL_ADDON_PASSWORD
console.log(host, user, database, password)
const db = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
})

export default db;