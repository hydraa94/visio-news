import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/cards/NewsCard";
import { useRouter } from "next/router";

export default function Ekonomi() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { q: query } = router.query;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/ekonomi");
        setNews(response.data.data);
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
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        Berita Ekonomi
      </h2>
      <div className="grid gap-4">
        {filteredNews.map((article, index) => (
          <NewsCard
            key={index}
            link={article.link}
            title={article.title}
            category="Ekonomi"
            image={article.image?.large || "/placeholder-news.jpg"}
            snippet={article.contentSnippet}
          />
        ))}
      </div>
    </div>
  );
}
