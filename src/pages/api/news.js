import axios from "axios";

// Daftar URL API untuk berita nasional dan internasional
const baseUrlNasional = [
  "https://berita-indo-api-next.vercel.app/api/cnn-news/nasional",
  "https://berita-indo-api-next.vercel.app/api/republika-news/nasional",
];

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

// Fungsi utama untuk mengambil berita
async function getNews(req, res) {
  try {
    // Ambil data berita nasional dan internasional secara paralel
    const [nasionalData, internasionalData] = await Promise.all([
      fetchData(baseUrlNasional),
      fetchData(baseUrlInternasional),
    ]);

    // Kirim response dengan data yang sudah digabungkan
    res.status(200).json({
      success: true,
      data: {
        nasional: nasionalData,
        internasional: internasionalData,
      },
    });
  } catch (error) {
    console.error("Error in getNews:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita",
      error: error.message,
    });
  }
}

export default getNews;
