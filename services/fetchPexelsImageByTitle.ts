const PEXELS_API_KEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY
    
export async function fetchPexelsImageByTitle(title: string): Promise<string | null> {
    if (!PEXELS_API_KEY) {
        throw new Error("Pexels API key is missing. Please set EXPO_PUBLIC_PEXELS_API_KEY.");
      }
    try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(title)}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const data = await response.json();
    const imageUrl = data.photos?.[0]?.src?.medium || null;

    return imageUrl;
  } catch (error) {
    console.error('Eroare la fetchPexelsImageByTitle:', error);
    return null;
  }
}
