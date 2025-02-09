import NewsPage from "../components/NewsPage";

export default function Internasional() {
  return (
    <NewsPage
      apiEndpoint="/api/internasional"
      title="Berita Internasional"
      categoryColor="text-blue-600"
    />
  );
}
