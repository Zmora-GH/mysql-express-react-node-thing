const express = require('express');
const config = require('config');

////////////////////////////////////////////
// var models = require("./backend/models");
// models.sequelize.sync().then(function() {
//     console.log('Nice! Database looks fine');
// }).catch(function(err) {
//     console.log(err, "Something went wrong with the Database Update!");
// });
////////////////////////////////////////////

const PORT = config.get('global.port') || 3003;


const app = express();


app.use(express.json());

app.use('/api/auth', require('./backend/routes/auth.router'));
app.use('/api/table', require('./backend/routes/table.router'));

app.listen(PORT, () => {
    console.log('[OK] Server started on port ', PORT);
})
