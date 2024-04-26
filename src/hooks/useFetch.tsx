export async function useFetch(url: string, options?: {}) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
