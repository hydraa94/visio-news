import logoImg from "../../../public/images/logo-news.png";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="sticky top-0 flex items-center justify-between px-0 py-4 gap-4 bg-white border-b-[2px] border-black shadow-xl z-50">
      <Link href="/" className="flex items-center">
        <Image
          src={logoImg}
          width={200}
          height={100}
          alt="Logo"
          className="ml-2"
        />
      </Link>

      <div className="flex items-center gap-6 text-lg font-semibold">
        <Link href="/" className="text-gray-800  hover:underline">
          Beranda
        </Link>
        <Link href="/nasional" className="text-gray-800  hover:underline">
          Nasional
        </Link>
        <Link href="/internasional" className="text-gray-800  hover:underline">
          Internasional
        </Link>
        <Link href="/ekonomi" className="text-gray-800  hover:underline">
          Ekonomi
        </Link>
        <Link href="/about" className="text-gray-800  hover:underline">
          Tentang Kami
        </Link>
      </div>

      <div className="flex items-center rounded-xl border-[2px] border-black shadow-md bg-white mr-4">
        <Form onSubmit={handleSearch} className="flex items-center">
          <button type="submit" className="m-2 text-black focus:outline-none">
            <Search className="w-7 h-7" strokeWidth={1} />
          </button>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="p-2 border-none bg-transparent focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400"
          />
        </Form>
      </div>
    </div>
  );
}
