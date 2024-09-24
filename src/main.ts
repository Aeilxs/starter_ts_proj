import { displayAllTweets } from "./displayTweets.js";
import { ctx, httpClient } from "./httpClient.js";
import { reformulateTweet } from "./reformulateTweets.js";
import { tweets } from "./tweets.js";

// const httpClient = new HttpClient("http://localhost:1234");

async function reformulateAllTweets() {
  try {
    // Parcourir chaque tweet et envoyer une requête pour le reformuler
    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      const response: any = await httpClient.post("/v1/chat/completions", {
        messages: [
          {
            role: "system",
            content: ctx,
          },
          { role: "user", content: `Reformulate this tweet: ${tweet.content}` },
        ],
        temperature: 0.7,
        max_tokens: 100, // Tu peux ajuster la valeur
      });

      const reformulatedContent = response.choices[0].message.content;

      // Utilise la fonction pour mettre à jour l'interface
      reformulateTweet(i, reformulatedContent);
    }
  } catch (error) {
    console.error("Erreur lors de la reformulation :", error);
  }
}

// Appeler la fonction après le chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  displayAllTweets();
  reformulateAllTweets(); // Reformuler tous les tweets après l'affichage
});
