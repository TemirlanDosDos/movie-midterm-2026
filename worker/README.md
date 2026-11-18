# Gemini movie search Worker

The Worker keeps the Gemini API key outside the public GitHub Pages code.

1. Open a terminal in the `worker` folder.
2. Run `npx wrangler login`.
3. Run `npx wrangler secret put GEMINI_API_KEY` and paste the key.
4. Run `npx wrangler deploy`.
5. Copy the resulting `workers.dev` URL into `js/gemini-search.js`.

For local development, create `worker/.dev.vars` containing
`GEMINI_API_KEY=your_key`. Never commit that file.
