import axios from "axios";

// Daftar URL API untuk berita nasional
const baseUrlNasional = [
  "https://berita-indo-api-next.vercel.app/api/cnn-news/nasional",
  "https://berita-indo-api-next.vercel.app/api/republika-news/nasional",
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
    // Ambil data berita nasional
    const nasionalData = await fetchData(baseUrlNasional);

    // Kirim response dengan data nasional
    res.status(200).json({
      success: true,
      data: nasionalData,
    });
  } catch (error) {
    console.error("Error in nasional API:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita nasional",
      error: error.message,
    });
  }
}
