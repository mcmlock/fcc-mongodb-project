const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

// Our modules
const db = require('./db');

const collection = "todo";

const app = express();
app.use(bodyParser.json());

db.connect(err => {
    if (err) {
        console.log('Something went wrong ' + err);
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('App listening on PORT 3000...');
        })
    }
})
