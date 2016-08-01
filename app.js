var Connection =require("mssql");
var exprress=require("express");
var app   = exprress();
var util=require("util");
var path=require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbconfig=
{
    user: "admin_triplepulse",
    password: "10_pulse",
    server: "triplepulse.database.windows.net",
    options: {encrypt: true,database: "TriplePulse"}
};

Connection.connect(dbconfig, function(err) {
    if(err) throw ("Issue in connecting to db");

    console.log("Connected");


});



app.post("/dboClient", function(req, res) {

    var data={


        clientName : req.body.clientName,
        clientMobile : req.body.clientMobile,
        clientEmail : req.body.clientEmail,
        clientPassword : req.body.clientPassword,
        deviceId : req.body.deviceId,
        phoneModel : req.body.phoneModel,
        androidVersionId : req.body.androidVersionId,
        softwareVersionName : req.body.softwareVersionName,
        softwareVersionCode : req.body.softwareVersionCode,
        createdBy : req.body.createdBy,
        createdDate : req.body.createdDate,
        updateFlag : req.body.updateFlag,
        insertFlag :req.body.insertFlag


    };

    Connection.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");

        }


        else {

            var request = new Connection.Request();

            console.log(data);



            var sql1 = "INSERT INTO Client(clientName,clientMobile,ClientEmail,ClientPassword,deviceId,phoneModel,androidVersionId,softwareVersionName,softwareVersionCode,createdBy,createdDate,updateFlag,insertFlag) values";


            sql1 += util.format("('%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s','%d','%d')",data.clientName,
                data.clientMobile, data.clientEmail, data.clientPassword, data.deviceId, data.phoneModel, data.androidVersionId,
                data.softwareVersionName, data.softwareVersionCode, data.createdBy,data.createdDate,data.updateFlag,data.insertFlag);
            var id = "SELECT clientId FROM Client WHERE clientId = SCOPE_IDENTITY();"
              var cusId=sql1+id;


            request.query(cusId, function (err, results) {

                if (err) {
                    console.log(err);

                    res.send("Cannot retrive records.");
                }
                else {

                    res.json(results);


                }

            });

        }
    });

});





var server = app.listen(8000,function ()
{
    console.log('server running at : 8000');

});
