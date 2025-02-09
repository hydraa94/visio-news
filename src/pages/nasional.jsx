import NewsPage from "../components/NewsPage";

export default function Nasional() {
  return (
    <NewsPage
      apiEndpoint="/api/nasional"
      title="Berita Nasional"
      categoryColor="text-red-600"
    />
  );
}
