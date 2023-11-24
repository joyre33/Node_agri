const express= require('express');
const redaxios=require('redaxios');

const app = express();
const port = 4000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Le serveur Express écoute sur le port ${port}`);
});
