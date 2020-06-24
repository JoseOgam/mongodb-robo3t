var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.post('/users', (req, res)=>{
    console.log(req.body);
    res.send('nodejs development');
});

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
});