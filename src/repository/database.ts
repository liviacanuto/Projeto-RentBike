import mysql from "mysql2";
import { dbConfig } from "./config/db";

export default mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: dbConfig.connectionLimit
}).promise();