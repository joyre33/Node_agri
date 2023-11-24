import express from 'express';
import redaxios from 'redaxios';

const app = express();
const port = 4000;

// Paramètres requis
const clientId = 'votre_client_id'; // Remplacez par votre valeur réelle
const clientSecret = 'votre_client_secret'; // Remplacez par votre valeur réelle
const grantType = 'client_credentials';

// Construire l'URL avec les paramètres
const apiUrl = `https://pro.ariarynet.com/oauth/v2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`;

// Effectuer une requête GET avec redaxios
redaxios.get(apiUrl)
    .then(response => {
        // Traiter la réponse ici
        console.log('Réponse du serveur:', response.data);
    })
    .catch(error => {
        // Gérer les erreurs
        console.error('Erreur lors de la requête GET:', error.message);
    });

app.listen(port, () => {
    console.log(`Le serveur Express écoute sur le port ${port}`);
});
