const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

// Our modules
const db = require('./db');

const collection = "todo";

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
//    return res.sendFile(path.join(__dirname, 'index.html'));
 return res.send('Placeholder');
});

app.get('/getTodos', (req, res) => {
    db.getDb().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            return res.status(404).json({ "error": `${err}`});
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
            return res.status(404).json({ "error": `${err}`});
        } else {
             return res.status(200).json(result);
        }
    });
});

app.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    
    db.getDb().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(taskId)}, (err, response) => {
        if (err) {
            res.status(400).json({ error: `${err}`});
        } else {
            res.status(200).json({ success: true });
        }
    });
});

app.post('/', (req, res) => {
    const newTask = req.body;

    db.getDb().collection(collection).insertOne(newTask, (err, response) => {
        if (err) {
            return res.status(404).json({ "error": `${err}`});
        } else {
            return res.status(200).json({ 
                response: response, 
                document: newTask 
            });
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
