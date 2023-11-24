const express= require('express');
const redaxios=require('redaxios');

const app = express();
const port = 4000;

function decrypt3DES(data, key) {
    try {
      let des_iv = Buffer.from("0000000000000000", "hex");
      let encryptedText = Buffer.from(data, "hex");
      let decipher = crypto.createDecipheriv(
        "des-ede3-cbc",
        Buffer.from(key.substr(0, 24)),
        des_iv
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (e) {}
  }

app.get("/success",(req,res)=>{
    const {idpanier,montant,ref_int,resultat,nom,date,ref_arn}=req.query;
    try {
       const data={
        idpanier: decrypt3DES(idpanier,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        montant: decrypt3DES(montant,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        ref_int: decrypt3DES(ref_int,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        resultat: decrypt3DES(resultat,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        nom: decrypt3DES(nom,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        date: decrypt3DES(date,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
        ref_arn: decrypt3DES(ref_arn,'cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba'),
       } 
       console.log(data); 

    } catch (error) {
        
    } 

})
app.get("/echec",(req,res)=>{
})
app.listen(port, () => {
    console.log(`Le serveur Express écoute sur le port ${port}`);
});
