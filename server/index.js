// index.js
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const tttRoutes = require('./routes/file.route');

const app = express();
let port = process.env.PORT || 4100;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/word-frequency-counter')));
app.use('/', tttRoutes);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/word-frequency-counter/index.html'));
})
const server = app.listen(port, () => {
    const host = server.address().address, port = server.address().port;
    console.log('Listening on port ' + port + ' and host ' + host);
});
