const express = require("express");
const fs = require("fs");
const { parse } = require("path");
const filePath = "E:\\CODE\\TODO_API\\data\\data.json";
const app = express();
let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
let data_list_length = data["todos"].length;

const PORT  = 3001;
app.use(express.json());

app.get("/todos", (req, res) => {
    res.status(200);
    return res.json(data);
})

app.post("/todos", (req, res) => {
    var newTask = {
        "id": ++data_list_length,
        "task": req.body["task"],
        "done": false
    }
    data["todos"].push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(data), ['w', 'utf-8']);
    return res.status(200).send("New Task added.");
})

app.put("/todos/:id", (req, res) => {
    const {
        body,
         params: {id},
    } = req;
    //console.log(body);
    //console.log(id);
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.status(400).send("Invalid ID");

    const findTaskIndex = data["todos"].findIndex((task) => task.id === parsedID);
    if(findTaskIndex === -1) return res.status(404).send("Task not found.");
    //console.log(findTaskIndex);
    //console.log(data["todos"][findTaskIndex]);
    data["todos"][findTaskIndex] = {id: parsedID, ...body};
    fs.writeFileSync(filePath, JSON.stringify(data), ['w', 'utf-8']);
    return res.status(200).send();
})

app.delete("/todos/:id", (req, res) => {
    const {
        body,
         params: {id},
    } = req;
    //console.log(body);
    //console.log(id);
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.status(400).send("Invalid ID");

    const findTaskIndex = data["todos"].findIndex((task) => task.id === parsedID);
    if(findTaskIndex === -1) return res.status(404).send("Task not found.");
    //console.log(findTaskIndex);
    //console.log(data["todos"][findTaskIndex]);
    data["todos"].splice(findTaskIndex, 1);
    data_list_length--;
    fs.writeFileSync(filePath, JSON.stringify(data), ['w', 'utf-8']);
    return res.status(200).send();
})


app.listen(PORT, () => {
    console.log(`HELLO, WORLD! I AM FROM PORT: ${PORT}`);
});