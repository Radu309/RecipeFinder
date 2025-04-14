const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

export async function fetchRecipesFromAI(prompt: string): Promise<string | null> {
  const messages = [
    {
      role: 'system',
      content: `You are a recipe assistant. Based on the user's request, respond with **up to 8 recipes** in **strict JSON format**. Each recipe should be realistic and diverse.

      Each recipe must include:
      - "title": Short and relevant to the request (e.g., "Creamy Garlic Pasta")
      - "duration": Time needed (e.g., "25 minutes")
      - "ingredients": A single string with ingredients separated by ";" (e.g., "pasta; garlic; olive oil; cream; salt")
      - "instructions": A single string of **at least 5 steps**, separated by ";". **Each step must be a distinct sentence or action**, not combined. **Avoid combining multiple steps into one.** Example:
      - ✅ "Boil water until it bubbles; Add pasta and stir occasionally; Cook for 10 minutes; Drain and rinse under cold water; Mix with sauce and serve"
      - ❌ "Boil water, add pasta, stir, cook for 10 minutes and drain"
      Respond only with a JSON array:
      [
        {
          "title": "Spicy Thai Noodles",
          "duration": "30 minutes",
          "ingredients": "rice noodles; soy sauce; chili flakes; garlic; sesame oil",
          "instructions": "Soak noodles in hot water; Mix soy sauce with chili; Stir-fry garlic until golden; Add noodles and sauce to pan; Cook for 5 minutes and serve"
         }
      ]
      
      **Important rules**:
      - No markdown, no explanation, no text before/after the JSON
      - If no recipes match, return []
      - Only include recipes relevant to the user prompt`
    },
    {
      role: 'user',
      content: `Give me recipe suggestions for: "${prompt}". Please follow the JSON format.`
    },
  ];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
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
