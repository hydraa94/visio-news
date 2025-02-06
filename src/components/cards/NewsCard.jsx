import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NewsCard({
  title,
  category = "Umum",
  image = "/placeholder-news.jpg",
  isHighlighted,
  link,
  snippet,
}) {
  return (
    <Link href={link} target="_blank">
      <Card className="flex flex-col md:flex-row gap-4 items-start m-2 p-4 border-b-[3px] border-black hover:bg-gray-100">
        <div className="w-full md:w-48 p-0 h-28 relative">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            unoptimized={true}
          />
        </div>

        <CardContent className="p-0 flex-1">
          <span
            className={`text-lg font-semibold ${
              isHighlighted ? "text-red-600" : "text-black"
            } hover:underline`}
          >
            {title}
          </span>
          <br />
          <Link href={"/" + category.toLowerCase()}>
            <span className="text-md text-red-500 font-medium hover:underline">
              {category}
            </span>
          </Link>
          <p className="text-sm text-gray-600">{snippet}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
