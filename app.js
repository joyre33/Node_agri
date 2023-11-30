const express = require("express");
const redaxios = require("redaxios");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");

const app = express();
const port = 4000;

const NEXT_PUBLIC_SUPABASE_URL = "https://hrtqiukcyttvnvzxnqxs.supabase.co";
const NEXT_PUBLIC_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhydHFpdWtjeXR0dm52enhucXhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTc5ODkxMCwiZXhwIjoyMDExMzc0OTEwfQ.CmYoY-MbCEQlAoBd8tEX3Ok1-2R9-yHq9MGVXLX0-fk";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY
);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kevinre33@gmail.com",
    pass: `myhk oumg okya oeqo`,
  },
});

function mail(email, subject, html) {
  const mailOptions = {
    from: "kevinre33@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
  });
}
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
app.get("/", async (req, res) => {});

app.get("/success", async (req, res) => {
  const { idpanier, montant, ref_int, resultat, nom, date, ref_arn } =
    req.query;
  try {
    const value = {
      idpanier: decrypt3DES(
        idpanier,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      montant: decrypt3DES(
        montant,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      ref_int: decrypt3DES(
        ref_int,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      resultat: decrypt3DES(
        resultat,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      nom: decrypt3DES(
        nom,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      date: decrypt3DES(
        date,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
      ref_arn: decrypt3DES(
        ref_arn,
        "cb72817821b60c9ec4a48ecd623c9e18351c3d924e76f816ba"
      ),
    };
    try {
      const { data, error } = await supabase.rpc("get_commande_details", {
        params_id: value.ref_int,
      });
      if (error) throw error;
      if (data) {
        console.log(data.length);
        console.log(data);
        const { id, code, prix, adresse, commande, date } = data[0];
        let items = "<div>";
        for (const item of commande) {
          items += `<div id="${
            item.id
          }" style="display:flex;align-items: center;">
            <img style="width: 80px;height: 80px; display: inline;margin-left: 5px;margin-right: 5px;margin-top: auto;margin-bottom: auto;" src="${
              "https://hrtqiukcyttvnvzxnqxs.supabase.co/storage/v1/object/public/" +
              "produit/" +
              item.photo
            }" alt="">
            <div style="width: 150px;">
                <p style="word-wrap: break-word;display:block">${item.nom}</p>
                <p style="display:inline">${
                  item.quantite
                } <p style="margin-left: 10px;display:inline"><span style="font-style: 'Roboto'; font-weight: bolder;">${
            item.unite
          }</p> </p>
            </div>
            <div style="width: 150px;margin-left: 5px;margin-bottom: auto;margin-top: auto;">
                 ${item.prix}Ar
            </div>
          }
  </div>`;
        }
        items += "</div>";
        const p = `   <div style="width: 100%; height: 100%; background-color: white; margin: 0px; padding: 0px;font-family: 'Roboto';">
          <div style="overflow: hidden; width: 400px; height: auto; border-width: 500px; background-color: #F5FBF5; border-radius: 20px;margin-left: auto;margin-right: auto;">
              <div style="display: flex; background-color: #3E9B4F; width: 100%; height: 50px; border-radius: 20px; overflow: hidden; padding: 10px;">
                  <img style="width: 50px; height: 50px; border-radius: 50%;margin-right: 10px;" src="https://scontent.xx.fbcdn.net/v/t1.15752-9/352356327_1606919196465711_8652610354768427720_n.jpg?stp=dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=61f064&_nc_eui2=AeFvS-zC3YwbqQt9018G4ZCG62_Q_j3Fp37rb9D-PcWnfhlOMpI3jniYyRC3o9DyyimZ6w_Sp3qy0r-v6Snw4hB6&_nc_ohc=vVn2I5l31pQAX-JFCfk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRJPxSBgNPBIBdbSU_iJgh-qoAiaEzj9SZmHFJtX_f2zw&oe=658FE5E9" alt="">
                  <h2 style="font-size: large; font-weight: bolder; color: white;">Confirmation de commande</h2>
              </div>
              <p style="margin-left: 10px;"><span style="font-style: 'Roboto'; font-weight: bolder;">Adresse de livraison:</span>${adresse}</p>
              <p style="margin-left: 10px;"><span style="font-style: 'Roboto'; font-weight: bolder;">Date de commande:</span>${ dayjs(date).format('YYYY-MM-DD')}</p>
              ${items}
              <p style="margin-left: 10px;text-align: center;"><span style="font-style: 'Roboto'; font-weight: bolder;">Code Promo: ${code}</span></p>
              <p style="margin-left: 10px;text-align: center;"><span style="font-style: 'Roboto'; font-weight: bolder;">Total:${prix}Ar</span></p>
      </div>
      `;
        if (data.length > 0) {
          const { data, error } = await supabase
            .from("commande")
            .update({ etat: "Payé" })
            .eq("id", value.idpanier)
            .select();
          if (error) throw error;
          res.send(data);
          console.log(data);
          mail(value.idpanier, "Commande payé avec succés", p);
        }
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  
  } catch (error) {}
});
app.get("/echec", (req, res) => {});
app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
