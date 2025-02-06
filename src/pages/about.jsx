import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import dummyImg from "../../public/images/people-dummy.jpeg";

const teamMembers = [
  {
    name: "YEDIA KUSUMA PUTRA",
    role: "Project Manager",
    class: "11 RPL 2",
    image: dummyImg,
    instagram: "",
  },
  {
    name: "TIARA EVANIA MAULIDIA PUTRI",
    role: "UI/UX Designer",
    class: "10 DKV 2",
    image: dummyImg,
  },
  {
    name: "YUMNA SALSABIL PUTRI TSABITAH",
    role: "Front-End Engineer",
    class: "10 DKV 2",
    image: dummyImg,
    instagram: "myzslife_",
  },
  {
    name: "MUHAMMAD NAILUL AUTOR",
    role: "Back-End Engineer",
    class: "10 TKJ 2",
    image: dummyImg,
    instagram: "xy.hydraa",
  },
];

export default function About() {
  return (
    <section className="text-center p-10">
      {/* Title */}
      <h2 className="text-3xl font-light">
        Meet the <span className="font-bold">Team.</span>
      </h2>

      {/* Brief Description */}
      <p className="mt-4 text-gray-600 max-w-6xl mx-auto">
        VISIONARY NEWS atau dapat disingkat menjadi VISIO NEWS merupakan situs
        daring yang menyajikan berita terkait politik baik di tigkat Nasional
        hingga Internasional. VISIO NEWS dibuat oleh siswa-siswi "VISIO-TEAM"
        yang tergabung dalam ekstrakulikuler IT Club SMKN 1 SRABAYA. Situs ini
        dibuat dalam rangka penyelesaian tugas proyek akhir. VISIO TEAM terdiri
        atas 4 (empat) peserta didik yang memiliki tugasnya sebagai berikut:
      </p>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="flex flex-col items-center text-center p-4 border-none ring-2 shadow-lg"
          >
            <CardTitle className="mb-4">
              <h1 className="text-2xl font-bold">{member.role}</h1>
            </CardTitle>
            {/* Image in Circle */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Name & Role */}
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <h3 className="text-md">{member.class}</h3>

            {/* Instagram Link */}
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM7 4h10c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3V7c0-1.657 1.343-3 3-3Zm9.75 2a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
              </svg>
              <span className="text-sm">{member.instagram}</span>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
