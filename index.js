const express = require("express");
const fs = require("fs");
const { parse } = require("path");
const Pool = require('pg').Pool
require("dotenv").config();

//ENVIRONMENT VARIABLES CHECK
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);

//DB Set Up
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

(async () => {
    try {
        await pool.query('SELECT 1');
        console.log("Connected to Database: %s", process.env.DB_NAME);
    }
    catch (err) {
        console.error("Unable to connect to DB Server: ", err);
        process.exit(1);
    }
})();

const filePath = "E:\\CODE\\TODO_API\\data\\data.json";
const app = express();
//let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//let data_list_length = data["todos"].length;

const PORT  = 3001;
app.use(express.json());

app.get("/todos", (req, res) => {

    pool.query('SELECT * FROM todos', (err, results) => {
        if (err){
            throw err;
        }
        res.status(200);
        return res.json(results.rows);

    })

})

app.post("/todos", (req, res) => {
    pool.query('INSERT INTO todos (task, done) VALUES ($1, FALSE) RETURNING *', [req.body["task"]], (err, results) => {
        if (err) {
            throw err;
        }
        return res.status(201).json(results.rows[0]);
    })
})

app.put("/todos/:id", (req, res) => {
    const {
        body,
         params: {id},
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.status(400).send("Invalid ID");
    pool.query(
        'UPDATE todos SET task = $1, done = $2 WHERE id = $3 RETURNING *',
        [body["task"], body["done"], parsedID],
        (err, results) => {
            if(err) {
                throw error
            }

            if(results.rowCount === 0){
                return res.status(404).send("Record not found.");
            }
            return res.status(202).json(results.rows[0]);
        }
    )
})

app.delete("/todos/:id", (req, res) => {
    const {
        body,
         params: {id},
    } = req;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.status(400).send("Invalid ID");
    pool.query('DELETE FROM todos WHERE id = $1', [parsedID], (err, results) =>{
        if (err) {
            throw err;
        }

        if(results.rowCount === 0) {
            return res.status(404).send("Record not found.");
        }

        return res.status(202).json(results.rows[0]);
    });
})


app.listen(PORT, () => {
    console.log(`HELLO, WORLD! I AM FROM PORT: ${PORT}`);
});