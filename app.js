const express = require('express');
const config = require('config');
const path = require('path');

var models = require("./backend/models");
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});


const PORT = process.env.PORT || config.get('global.port');

const app = express();


app.use(express.json(type="application/json"));

app.use('/api/auth', require('./backend/routes/auth.router'));
app.use('/api/table', require('./backend/routes/table.router'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('[OK] Server started on port ', PORT);
})
