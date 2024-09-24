type HttpMethod = "GET" | "POST";

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Méthode générique pour envoyer des requêtes avec gestion du streaming
  private async sendRequest<T>(
    url: string,
    method: HttpMethod,
    body?: any,
    stream?: boolean
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }

    // Gère le streaming si l'option 'stream' est activée
    if (stream && response.body) {
      return this.streamResponse<T>(response.body.getReader());
    } else {
      return response.json();
    }
  }

  private async streamResponse<T>(
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<T> {
    let result = "";
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;

      if (value) {
        // Convertit les octets en chaîne de caractères
        const chunk = new TextDecoder().decode(value);

        console.log("Chunk reçu :", chunk); // Affiche chaque chunk reçu

        // Vérifie si le chunk contient "data: [DONE]" ou d'autres éléments non JSON et les ignore
        if (chunk.includes("[DONE]")) {
          continue;
        }

        result += chunk;
      }
    }

    try {
      // Filtrer les morceaux du flux pour ne garder que les objets JSON valides
      const jsonChunks = result
        .split("\n") // Diviser par ligne si chaque chunk est sur une nouvelle ligne
        .filter((line) => line.trim().startsWith("{")) // Garde seulement les lignes JSON
        .map((line) => JSON.parse(line)); // Parse chaque ligne JSON séparément

      // Retourne le dernier objet complet, qui contient la réponse finale
      return jsonChunks[jsonChunks.length - 1];
    } catch (error) {
      throw new Error("Erreur lors du parsing du JSON");
    }
  }

  public async post<T>(
    url: string,
    body: any,
    stream: boolean = false
  ): Promise<T> {
    return this.sendRequest<T>(url, "POST", body, stream);
  }

  public async get<T>(url: string): Promise<T> {
    return this.sendRequest<T>(url, "GET");
  }
}

export const httpClient = new HttpClient("http://localhost:1234");

export const ctx: string = `You are a text rephrasing tool, not a chatbot. Your task is to strictly reformulate tweets to make them respectful and non-offensive. 

Rules:
1. **DO NOT** provide any commentary, opinions, or explanations about the tweet or your actions.
2. **DO NOT** use phrases like "I cannot reformulate this tweet" or "Here is a reformulation".
3. **DO NOT** change the original meaning
4. **DO NOT**add any new information.
5. **DO NOT** change the original structure of the tweet more than necessary to make it respectful.
6. **ONLY** return the reformulated tweet text or the exact phrase 'UNABLE TO MODERATE' (without quotation marks).
7. If the tweet is already respectful, return it exactly as it is.
8. If the tweet contains discriminatory, hateful, or offensive content that cannot be ethically reformulated, return the phrase 'UNABLE TO MODERATE' without altering or appending it in any way.

You must strictly follow these rules. Your output should be either a single reformulated tweet or 'UNABLE TO MODERATE'. No other responses are acceptable. But you should be able to moderate almost every hateful content.`;
