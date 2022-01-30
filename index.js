const express = require("express");  //henter express
const Datastore = require("nedb");


const app = express();  //får tilgang til express-biblioteket

const port = process.env.PORT || 3000;  //environment port (på ekstern server) eller localhost 3000
app.listen(port, () => {
    console.log("Starting listening");
});
//app.listen(3000, () => console.log("Listening at 3000")); //express lytter


app.use(express.static("public"));  //express peker til folder som skal være tilgjengelig frontend
app.use(express.json({ limit: "1mb" })) //express gir mulighet til på lese json-filer

const database = new Datastore("database.db");
database.loadDatabase();  //laster databasen


//henter ut data fra databasen
app.get("/allData", (request, response) => {
    console.log(request);
    //{} = ser etter "alt"
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
})


app.post("/fiskelogg", (request, response) => {
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.json({
        status: "success"
    })
})