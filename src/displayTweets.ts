import { reformulateTweet } from "./reformulateTweets.js";
import { tweets } from "./tweets.js";

export function displayAllTweets(): void {
  const tweetContainer = document.getElementById("tweet-display");

  if (tweetContainer) {
    tweetContainer.innerHTML = ""; // Vide le conteneur avant d'afficher tous les tweets

    tweets.forEach((tweet, index) => {
      const tweetElement = document.createElement("div");
      tweetElement.classList.add("tweet-pair");

      tweetElement.innerHTML = `
                <div class="tweet">
                    <div class="tweet__user">
                        <img class="tweet__avatar" src="${
                          tweet.avatarUrl + index
                        }" alt="User Avatar" />
                        <div class="tweet__details">
                            <span class="tweet__name">${tweet.accname}</span>
                            <span class="tweet__username">@${tweet.uname}</span>
                        </div>
                    </div>
                    <div class="tweet__content">${tweet.content}</div>
                    <button class="reformulate-btn" data-index="${index}">Reformuler</button>
                </div>
                <div class="tweet" id="reformulated-tweet-${index}">
                    <div class="tweet__user">
                        <img class="tweet__avatar" src="${
                          tweet.avatarUrl + index
                        }" alt="User Avatar" />
                        <div class="tweet__details">
                            <span class="tweet__name">${tweet.accname}</span>
                            <span class="tweet__username">@${tweet.uname}</span>
                        </div>
                    </div>
                    <div class="tweet__content"><em>Reformulated content will appear here...</em></div>
                </div>
            `;

      tweetContainer.appendChild(tweetElement);
    });

    // Ajoute les gestionnaires d'événements aux boutons "Reformuler"
    document.querySelectorAll(".reformulate-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        const index = parseInt(target.getAttribute("data-index") || "0", 10);
        reformulateTweet(index, "better tweet");
      });
    });
  }
}
