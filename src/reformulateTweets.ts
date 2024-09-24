import { ctx, httpClient } from "./httpClient.js";
import { tweets } from "./tweets.js";

export async function reformulateTweet(
  index: number,
  newContent?: string
): Promise<void> {
  const reformulatedTweet = document.getElementById(
    `reformulated-tweet-${index}`
  );
  if (!reformulatedTweet) {
    console.error(`No tweet element found with index ${index}`);
    return;
  }

  // Mettre à jour l'élément DOM pour indiquer que le tweet est en cours de reformulation
  reformulatedTweet.querySelector(".tweet__content")!.textContent =
    "Reformulating...";

  try {
    const originalContent = tweets[index].content;

    // Appeler l'API pour obtenir la reformulation
    const response = await httpClient.post("/v1/chat/completions", {
      messages: [
        {
          role: "system",
          content: ctx,
        },
        { role: "user", content: `Reformulate this tweet: ${originalContent}` },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    // Vérifier que la réponse contient bien un contenu reformulé
    const reformulatedContent = response.choices[0]?.message?.content;
    if (reformulatedContent) {
      // Mettre à jour le contenu du tweet reformulé
      reformulatedTweet.querySelector(".tweet__content")!.textContent =
        reformulatedContent;
    } else {
      reformulatedTweet.querySelector(".tweet__content")!.textContent =
        "No reformulated content received.";
    }
  } catch (error) {
    console.error("Erreur lors de la reformulation :", error);
    reformulatedTweet.querySelector(".tweet__content")!.textContent =
      "Error while reformulating.";
  }
}
