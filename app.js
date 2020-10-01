const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const models = require('./models');
const app = express();
const PORT = 5000;


const env = nunjucks.configure('views', { noCache: true });
// hace res.render funcionar con archivos html
app.use(express.static('./public'))
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.

//app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('html', nunjucks.render);
nunjucks.configure('views');

app.use('/', routes);
app.use((err, req, res, next) => res.sendStatus(404))

// app.get("/", (req, res, next) => {
//     res.render('index')
// })

models.db.sync({})
    .then(function () {
        // asegurate de reemplazar el nombre de abajo con tu app de express
        if (!module.parent) app.listen(PORT, function () {
            console.log(`Server is listening on port ${PORT}!`);
        });
    })
    .catch(console.error);

module.exports = app;