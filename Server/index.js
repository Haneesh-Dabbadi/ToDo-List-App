const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require('./Models/ToDo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<your-db-name>:<your-db-password>@cluster0.pmazw.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas:", err);
});

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.json({ message: "Task added successfully!", result }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
