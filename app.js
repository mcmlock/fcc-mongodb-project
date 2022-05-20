const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

// Our modules
const db = require('./db');

const collection = "todo";

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
    db.getDb().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(documents);
        }
    });
});

app.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    db.getDb().collection(collection)
    .findOneAndUpdate({ _id: db.getPrimaryKey(taskId)}, {$set: { name: updatedTask}}, {returnDocument: 'after'}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
             return res.status(200).json(result);
        }
    });
});

db.connect(err => {
    if (err) {
        console.log('Something went wrong ' + err);
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('App listening on PORT 3000...');
        })
    }
});
