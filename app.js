const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

// Our modules
const db = require('./db');

const collection = "todo";

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
    db.getDb().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(documents);
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
