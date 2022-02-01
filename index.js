const express = require("express");  //henter express
const Datastore = require("nedb");


const app = express();  //får tilgang til express-biblioteket

const port = process.env.PORT || 3000;  //environment port (på ekstern server) eller localhost 3000
app.listen(port, () => {
    console.log("Starting listening");
});
//app.listen(3000, () => console.log("Listening at 3000")); //express lytter


app.use(express.static("public"));  //express peker til folder som skal være tilgjengelig frontend
app.use(express.json({ limit: "1mb" })) //recognize incoming request object as json object

const database = new Datastore({ filename: "database.db" });
database.loadDatabase();  //laster databasen


//forespørsel fra all.html
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

//tar imot fra index.html og legger i database
//sender response tilbake til index.html
app.post("/fiskelogg", (request, response) => {
    //console.log(request.body.vekt);
    const data = request.body;
    database.insert(data);
    response.json({
        status: "success",
        rapportert_vekt: request.body.vekt,
    })
})