import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchItems(paths: string) {
  try {
    const { data } = await http.get<string[]>("/dir", {
      params: {
        paths
      },
    });
    return data;
  } catch (error) {
    return [];
  }
}
