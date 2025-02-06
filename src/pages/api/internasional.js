import axios from "axios";

// Daftar URL API untuk berita internasional
const baseUrlInternasional = [
  "https://berita-indo-api-next.vercel.app/api/cnn-news/internasional",
  "https://berita-indo-api-next.vercel.app/api/republika-news/internasional",
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
    // Ambil data berita internasional
    const internasionalData = await fetchData(baseUrlInternasional);

    // Kirim response dengan data internasional
    res.status(200).json({
      success: true,
      data: internasionalData,
    });
  } catch (error) {
    console.error("Error in internasional API:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita internasional",
      error: error.message,
    });
  }
}
