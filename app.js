const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./Register/models");
const authjwt = require("./Register/middleware/verifyAuth");
db.sequelize.sync({ force: true }).then(async () => {
    console.log("sync db");
})
app.get('/api/auth/userSignup/:token', authjwt.verifyToken,(req,res)=>{
    res.sendFile(__dirname + '/Register/templates/index.html');
});
app.get('/api/auth/signin',(req,res)=>{
    res.sendFile(__dirname + '/Register/templates/signin.html');
});

require('./Register/routes/auth.routes')(app);
const PORT = process.env.PORT || 8080;

async function listen() {
    await app.listen(PORT);
    console.log(`server is running on ${PORT}`);

}
listen();

