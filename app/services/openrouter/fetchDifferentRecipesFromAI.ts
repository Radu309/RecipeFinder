const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

export async function fetchDifferentRecipesFromAI(prompt: string): Promise<string | null> {
  const messages = [
    {
      role: 'system',
      content: `
      You are a recipe assistant. Based on the user's request, respond with **up to 8 recipes** in **strict JSON format**. Each recipe should be realistic, diverse, and relevant to the theme of the prompt or previous results.
      
      Each recipe must include:
      - "title": A short, descriptive name (e.g., "Creamy Garlic Pasta")
      - "duration": Estimated time (e.g., "25 minutes")
      - "ingredients": A single string with items separated by ";" (e.g., "pasta; garlic; olive oil; cream; salt")
      - "instructions": A single string of at least 5 **distinct** steps, separated by ";". Each step should be one clear action or sentence. 
        - ✅ Example: "Boil water until it bubbles; Add pasta and stir occasionally; Cook for 10 minutes; Drain and rinse; Mix with sauce and serve"
        - ❌ Avoid combining: "Boil water, add pasta, stir, cook and drain"
      
      When generating recipes based on a list of previous titles:
      - Do NOT repeat any existing titles
      - Do NOT reuse the same ingredients list
      - Try to keep the **same cuisine type**, flavor profile, or dietary theme (e.g., Italian pasta, vegan dishes, spicy Asian meals)
      - Think of creative and new ideas within the same context
      
      Respond **only** with a JSON array like:
      [
        {
          "title": "Lemon Basil Penne",
          "duration": "30 minutes",
          "ingredients": "penne; lemon; basil; olive oil; parmesan",
          "instructions": "Boil penne until al dente; Zest and juice the lemon; Heat olive oil in a pan; Toss pasta with lemon juice, zest and basil; Sprinkle with parmesan and serve"
        },
        ...
      ]
      
      **Important rules**:
      - NO markdown, code blocks, or explanations
      - Only return the raw JSON array
      - If nothing matches, return an empty array: []`
    },
    {
      role: 'user',
      content: `${prompt}.`,
    },
  ];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        // 'HTTP-Referer': 'http://localhost',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('[OpenRouter API Error]', data.error);
      return null;
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('[DEBUG] Raw OpenRouter response:', content);
    return content;
  } catch (err) {
    console.error('[OpenRouter fetch failed]', err);
    return null;
  }
}
