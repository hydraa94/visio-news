import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/cards/NewsCard";
import { useRouter } from "next/router";
import Pagination from "@/components/common/pagination";
import { usePagination } from "@/hooks/usePagination";

export default function Ekonomi() {
  const [news, setNews] = useState([]); // All news fetched from the API
  const [filteredNews, setFilteredNews] = useState([]); // News filtered by search query
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { q: query } = router.query; // Extract search query from URL

  // Use the custom pagination hook
  const {
    currentItems,
    totalPages,
    currentPage,
    paginate,
    getPaginationGroup,
  } = usePagination(filteredNews, 10); // 10 items per page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/nasional");
        const data = response.data.data;

        // Add a category field to each article
        const enrichedData = data.map((article) => ({
          ...article,
          category: "Nasional", // Manually assign the category
        }));

        setNews(enrichedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setFilteredNews(news); // No query, show all news
      return;
    }

    // Filter news based on the search query
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
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        Berita Nasional
      </h2>

      {/* News Cards */}
      <div className="grid gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((article, index) => (
            <NewsCard
              key={index}
              link={article.link}
              title={article.title}
              category={article.category || "Umum"}
              image={article.image?.large || "/placeholder-news.jpg"}
              snippet={article.contentSnippet}
            />
          ))
        ) : (
          <div className="text-center p-8">
            Tidak ada berita yang ditemukan.
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        getPaginationGroup={getPaginationGroup}
      />
    </div>
  );
}
