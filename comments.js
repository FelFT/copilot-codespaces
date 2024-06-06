//Create web server 
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(data), function (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
// Path: comments.json
[]
// Path: index.html
<!DOCTYPE html>
<html>
    <head>
        <title>React Tutorial</title>
    </head>
    <body>
        <div id="content"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></script>
        <script type="text/babel">
            var Comment = React.createClass({
                render: function() {
                    return (
                        <div className="comment">
                            <h2 className="commentAuthor">
                                {this.props.author}
                            </h2>
                            <span dangerouslySetInnerHTML={{__html: marked(this.props.children.toString())}} />
                        </div>
                    );
                }
            });

            var CommentList = React.createClass({