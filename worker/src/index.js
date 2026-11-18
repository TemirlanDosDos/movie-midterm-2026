const allowedOrigins = new Set([
  "https://temirlandosdos.github.io",
  "http://127.0.0.1:5500",
  "http://localhost:5500"
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://temirlandosdos.github.io",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin"
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function getOutputText(data) {
  return data.candidates?.[0]?.content?.parts?.filter(part => !part.thought && part.text).map(part => part.text).join('');
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Use a POST request." }, 405, origin);
    }

    if (!allowedOrigins.has(origin)) {
      return jsonResponse({ error: "This website is not allowed to use the service." }, 403, origin);
    }

    try {
      const body = await request.json();
      const query = typeof body.query === "string" ? body.query.trim() : "";

      if (query.length < 2 || query.length > 100) {
        return jsonResponse({ error: "Enter a movie title between 2 and 100 characters." }, 400, origin);
      }

      const prompt = [
        "Find the real movie that best matches this title: " + JSON.stringify(query) + ".",
        "Return factual information only. If the title is ambiguous, choose the best-known exact match.",
        "Write a neutral English description in two short sentences. Do not use Markdown."
      ].join("\n");

      const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{parts: [{text: prompt}]}],
          generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 2048,
            responseJsonSchema: {
              type: "object",
              properties: {
                title: { type: "string" },
                year: { type: "integer" },
                genres: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 5 },
                description: { type: "string" }
              },
              required: ["title", "year", "genres", "description"],
              additionalProperties: false
            }
          }
        })
      });

      const interaction = await geminiResponse.json();
      if (!geminiResponse.ok) {
        console.error("Gemini API error", geminiResponse.status);
        return jsonResponse({ error: "Gemini could not complete the search. Try again later." }, 502, origin);
      }

      const text = getOutputText(interaction);
      if (!text) {
        return jsonResponse({ error: "Gemini returned an empty answer." }, 502, origin);
      }

      const movie = JSON.parse(text);
      const validMovie = typeof movie.title === "string" &&
        Number.isInteger(movie.year) &&
        Array.isArray(movie.genres) &&
        movie.genres.every(function (genre) { return typeof genre === "string"; }) &&
        typeof movie.description === "string";

      if (!validMovie) {
        return jsonResponse({ error: "Gemini returned an unexpected answer." }, 502, origin);
      }

      return jsonResponse(movie, 200, origin);
    } catch (error) {
      console.error("Movie search error", error);
      return jsonResponse({ error: "The movie search is temporarily unavailable." }, 500, origin);
    }
  }
};
