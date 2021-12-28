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
db.sequelize.sync({ force: true }).then(async () => {
    console.log("sync db");
})
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application" });
})

require('./Register/routes/auth.routes')(app);
const PORT = process.env.PORT || 8080;

async function listen() {
    await app.listen(PORT);
    console.log(`server is running on ${PORT}`);

}
listen();

