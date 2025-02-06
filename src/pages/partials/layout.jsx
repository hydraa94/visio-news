import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
