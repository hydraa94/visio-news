import axios from "axios";

// Daftar URL API untuk berita ekonomi
const baseUrlEkonomi = [
  "https://berita-indo-api-next.vercel.app/api/cnn-news/ekonomi",
  "https://berita-indo-api-next.vercel.app/api/cnbc-news/market",
  "https://berita-indo-api-next.vercel.app/api/republika-news/ekonomi",
];

// Fungsi untuk mengambil data dari API
async function fetchData(urls) {
  try {
    const responses = await Promise.all(urls.map((url) => axios.get(url)));
    return responses.flatMap((response) => response.data.data || response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    // Ambil data berita ekonomi
    const ekonomiData = await fetchData(baseUrlEkonomi);

    // Kirim response dengan data ekonomi
    res.status(200).json({
      success: true,
      data: ekonomiData,
    });
  } catch (error) {
    console.error("Error in ekonomi API:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita ekonomi",
      error: error.message,
    });
  }
}
