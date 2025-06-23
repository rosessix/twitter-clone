import mysql from 'mysql2/promise'

const host = 'localhost'
const user = 'root'
const database = 'daydream'
const password = ''

const db = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
})

export default db;