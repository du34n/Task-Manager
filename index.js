
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];

app.get('/',(req, res) =>{
    res.send('Welcome to the Task Manager API!');
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    
    if(!title) {
        return res.status(400).send({ error: 'Title is required' });
    }
    
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).send(newTask);
})

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const task = tasks.find((t) => t.id === parseInt(id));

    if(!task) {
        return res.status(404).send({ error: 'Task not found'});
    }
    
    if(title !== undefined) task.title = title;
    if(completed !== undefined) task.completed = completed;

    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

    if(taskIndex === -1) {
        return res.status(404).send({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.send(deletedTask[0]);
});

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});