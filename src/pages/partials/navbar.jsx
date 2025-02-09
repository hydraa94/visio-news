// components/navbar.jsx
import logoImg from "../../../public/images/logo-news.png";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const router = useRouter();

  useEffect(() => {
    setSearchQuery("");
  }, [router.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const pathname = router.pathname;
      router.push(`${pathname}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="sticky top-0 flex items-center justify-between px-4 py-4 gap-4 bg-white border-b-[2px] border-black shadow-xl z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src={logoImg}
          width={120} // Scaled down for mobile
          height={60} // Scaled down for mobile
          alt="Logo"
          className="ml-2"
        />
      </Link>

      {/* Hamburger Menu (Mobile Only) */}
      <button
        className="md:hidden text-black focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6 md:text-lg text-sm font-semibold">
        <Link href="/" className="text-gray-800 hover:underline">
          Beranda
        </Link>
        <Link href="/nasional" className="text-gray-800 hover:underline">
          Nasional
        </Link>
        <Link href="/internasional" className="text-gray-800 hover:underline">
          Internasional
        </Link>
        <Link href="/ekonomi" className="text-gray-800 hover:underline">
          Ekonomi
        </Link>
        <Link href="/about" className="text-gray-800 hover:underline">
          Tentang Kami
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-white border-b-[2px] border-black shadow-md z-50 transition-all duration-300`}
      >
        <div className="flex flex-col gap-2 p-4">
          <Link
            href="/"
            className="text-gray-800 hover:underline text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="/nasional"
            className="text-gray-800 hover:underline text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Nasional
          </Link>
          <Link
            href="/internasional"
            className="text-gray-800 hover:underline text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Internasional
          </Link>
          <Link
            href="/ekonomi"
            className="text-gray-800 hover:underline text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Ekonomi
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:underline text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Tentang Kami
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-xl border-[2px] border-black shadow-md bg-white mr-4 w-[250px]">
        <Form onSubmit={handleSearch} className="flex items-center">
          <button type="submit" className="m-2 text-black focus:outline-none">
            <Search className="w-6 h-6" strokeWidth={1} />
          </button>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="p-2 border-none bg-transparent focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400 text-sm sm:text-base"
          />
        </Form>
      </div>
    </div>
  );
}
