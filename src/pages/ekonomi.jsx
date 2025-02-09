import NewsPage from "../components/NewsPage";

export default function Ekonomi() {
  return (
    <NewsPage
      apiEndpoint="/api/ekonomi"
      title="Berita Ekonomi"
      categoryColor="text-yellow-600"
    />
  );
}
