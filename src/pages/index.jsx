import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/cards/NewsCard";
import { useRouter } from "next/router";

export default function Home() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { q: query } = router.query;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [nasionalResponse, internasionalResponse, ekonomiResponse] =
          await Promise.all([
            axios.get("/api/nasional"),
            axios.get("/api/internasional"),
            axios.get("/api/ekonomi"),
          ]);

        const nasionalData = nasionalResponse.data.data;
        const internasionalData = internasionalResponse.data.data;
        const ekonomiData = ekonomiResponse.data.data;

        const combinedNews = [];
        const maxLength = Math.max(
          nasionalData.length / 10,
          internasionalData.length / 10,
          ekonomiData.length / 10
        );

        for (let i = 0; i < maxLength; i++) {
          if (i < nasionalData.length) {
            combinedNews.push({ ...nasionalData[i], category: "Nasional" });
          }
          if (i < internasionalData.length) {
            combinedNews.push({
              ...internasionalData[i],
              category: "Internasional",
            });
          }
          if (i < ekonomiData.length) {
            combinedNews.push({
              ...ekonomiData[i],
              category: "Ekonomi",
            });
          }
        }

        setNews(combinedNews);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredNews(news); // Reset to original data if no query
      return;
    }

    const filtered = news.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [query, news]);

  if (loading) return <div className="text-center p-8">Memuat berita...</div>;
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Berita Terbaru</h1>
      <div className="grid gap-1">
        {filteredNews.map((article, index) => (
          <NewsCard
            key={index}
            link={article.link}
            title={article.title}
            category={article.category || "Umum"}
            image={article.image?.large || "/placeholder-news.jpg"}
            snippet={article.contentSnippet}
          />
        ))}
      </div>
    </div>
  );
}
