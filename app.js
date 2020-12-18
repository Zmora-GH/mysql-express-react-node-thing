const express = require('express');
const config = require('config');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

////////////////////////////////////////////
var models = require("./backend/models");
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
////////////////////////////////////////////

const PORT = config.get('global.port') || 3003


const app = express()


app.use(express.json());
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api/auth', require('./routes/auth.router'))

app.listen(PORT, () => {
    console.log('[OK] Server started on port ', PORT);
})
