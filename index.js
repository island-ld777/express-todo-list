const express = require("express");
const fs = require("fs");
const filePath = "E:\\CODE\\TODO_API\\data\\data.json";
const app = express();
let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const port  = 3001;

app.get("/todos", (req, res) => {
    res.json(data);
})

app.listen(port, () => {
    console.log(`HELLO, WORLD! I AM FROM PORT: ${port}`);
});