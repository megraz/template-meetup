const fs = require('fs');
const express = require('express');
const mustache = require('mustache');

let db = [{
        name: "",
        place: ""
    },
    {
        name: "",
        place: ""
    },
    {
        name: "",
        place: ""
    }
];

let app = express();

app.use(express.static("template"));

app.get("/", function(req, resp) {
    resp.render('index', {
        events: db
    });
});

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })
});

app.set('views', './template');
app.set('view engine', 'html');

app.listen(3000, "localhost", function() {
    console.log('Server listening on port 3000...');
});