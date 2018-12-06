var config = require('./config');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const InputDataDecoder = require('ethereum-input-data-decoder');

app.post('/decode', function(req, res) {
    var resdata = {
        code :0,
        msg: "fail",
        data: null
    }
    var abiname = req.body.abi;
    var data = req.body.data;
    console.log("Request data is:"+data);
    const decoder = new InputDataDecoder(config.abi[abiname]);
    const result = decoder.decodeData(data);
    console.log(result.name);
    if (result.name == "transfer"){
        console.log(result.inputs[1].toString(10));
        resdata.code = 1;
        resdata.msg = "ok";
        resdata.data = {
            method:result.name,
            address:"0x"+result.inputs[0].toString(),
            amount:result.inputs[1].toString(10)
        };
    }
    res.send(resdata);
});


var server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});
