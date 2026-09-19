"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Fingerprint,
  Layers,
  MessageSquare,
  Package,
  Search,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

const img = (name: string) =>
  `/project/BCA%20UI/${name
    .replace(/ /g, "%20")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")}`;

const cover = img("Group 393 1 1-min.png");
const researchVisual = img("Group 131-min.png");
const userResearchVisual = img("Revamp M-BCA 1-min.png");
const painInterface = img("Group 69 1-min.png");
const painMutasi = img("Group 71 1-min.png");
const painBukti = img("Group 73 1-min.png");
const persona1 = img("Group 65 1-min.png");
const persona2 = img("Group 67 1-min.png");
const flowBefore = img("Group 83 (1) 1-min.png");
const flowAfter = img("Untitled (6) 1-min.png");
const crazy8 = img("a1ec3e18-b58d-49c7-b440-5bdaf248b80b 1 (1) 1-min.png");
const screenHome = img("Group 176-min.png");
const screenXfer = img("Group 175 2-min.png");
const screenXferFlow = img("Group 176 1-min.png");
const screenMutasi = img("Group 177 1-min.png");
const screenLogin = img("Group 179 1-min.png");
const screenFeed = img("Group 175 1-min.png");

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Design Process" },
  { id: "research", label: "Research" },
  { id: "define", label: "Define" },
  { id: "design", label: "Design" },
  { id: "validate", label: "Validate" },
  { id: "conclusion", label: "Conclusion" },
];

/* ---------------- Primitives ---------------- */

function SectionTitle({
  eyebrow,
  title,
  step,
}: {
  eyebrow: string;
  title: string;
  step?: string;
}) {
  return (
    <div className="scroll-mt-32">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#fb4157]/30 bg-[#fb4157]/10 text-sm font-bold text-[#ff6c6b]">
          {step ?? eyebrow.charAt(0)}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6c6b]">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-[15px] leading-[1.9] text-muted">{children}</p>
  );
}

function CaseImage({
  src,
  alt,
  aspect,
  caption,
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("my-10", className)}
    >
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
        <div className={cn("relative", aspect)}>
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 850px" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 flex items-start gap-2 text-xs text-muted">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#fb4157]/60" />
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function InsightCard({
  children,
  title,
  tone = "default",
}: {
  children: ReactNode;
  title?: string;
  tone?: "default" | "primary" | "accent";
}) {
  const toneClass =
    tone === "primary"
      ? "border-[#fb4157]/30 from-[#fb4157]/[0.08] to-transparent"
      : tone === "accent"
        ? "border-[#fde65c]/25 from-[#fde65c]/[0.06] to-transparent"
        : "border-white/[0.08] from-white/[0.03] to-transparent";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6",
        toneClass
      )}
    >
      {title && (
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
          {title}
        </h4>
      )}
      <div className="space-y-2 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

const listItemCls =
  "flex items-start gap-3 text-[15px] leading-relaxed text-muted";

function CheckItem({
  children,
  highlight,
}: {
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <li className={listItemCls}>
      <span
        className={cn(
          "mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          highlight ? "bg-[#fb4157] text-white" : "bg-[#fb4157]/15 text-[#ff6c6b]"
        )}
      >
        <Check className="h-3 w-3" />
      </span>
      <span className={highlight ? "text-white" : ""}>{children}</span>
    </li>
  );
}

/* ---------------- Page ---------------- */

export default function BcaMobileCaseStudy() {
  return (
    <main className="bg-noise relative min-h-screen bg-ink text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-8 pt-32 sm:px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-2 text-xs font-medium text-muted"
        >
          <Link href="/#home" className="transition-colors hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/#work" className="transition-colors hover:text-white">
            Work
          </Link>
          <span>/</span>
          <span className="text-white/70">BCA Mobile</span>
        </motion.nav>

        {/* ---------- HERO ---------- */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="glass rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                UI/UX Design
              </span>
              <span className="glass rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                Case Study
              </span>
              <span className="glass rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                2020
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Redesign <span className="gradient-text">BCA Mobile</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
              Menyederhanakan pengalaman mobile banking untuk pengguna di semua
              usia — dari observasi, riset, hingga prototipe yang teruji ulang —
              sehingga transaksi, mutasi, dan bukti transfer jadi satu alur yang
              ringkas.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="rainbow"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("overview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Read Case Study <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() =>
                  (window.location.href = window.location.origin + "/#work")
                }
              >
                <ArrowLeft className="h-4 w-4" /> All Work
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#fb4157]/15 blur-[70px]" />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white shadow-[0_40px_90px_-24px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[1439/878]">
                  <Image src={cover} alt="BCA Mobile redesign cover" fill className="object-cover" sizes="(max-width: 1200px) 100vw, 620px" priority />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------- META ---------- */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: Layers, k: "Role", v: "UI/UX · Research" },
            { icon: Package, k: "Client", v: "Bank BCA" },
            { icon: Target, k: "Scope", v: "Redesign App" },
            { icon: Users, k: "Team", v: "UX Team" },
            { icon: Search, k: "Methods", v: "UT · Interview" },
            { icon: Fingerprint, k: "Output", v: "Hi-fi Prototype" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-2xl border border-white/[0.07] bg-surface p-4"
            >
              <m.icon className="mb-3 h-4 w-4 text-[#ff6c6b]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                {m.k}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">{m.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- CONTENT + TOC ---------- */}
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                On this page
              </p>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-2xl border border-[#fb4157]/25 bg-[#fb4157]/[0.06] p-5">
                <p className="text-sm font-semibold text-white">
                  Punya proyek serupa?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Saya terbuka untuk kolaborasi desain produk.
                </p>
                <Link
                  href="/#contacts"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff6c6b]"
                >
                  Contact me <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0">
            {/* ============ OVERVIEW ============ */}
            <section id="overview" className="scroll-mt-32 pb-4">
              <SectionTitle eyebrow="Overview" title="BCA Mobile" step="Overview" />
              <div className="mt-8 max-w-[720px] space-y-6">
                <Body>
                  PT Bank Central Asia (BCA) adalah salah satu bank swasta
                  terbesar yang telah memiliki nasabah di seluruh Indonesia.
                  Bank BCA berfokus pada transaksi perbankan keseharian,
                  perbankan bisnis, fasilitas pinjaman kredit, serta solusi
                  keuangan untuk nasabah korporasi, komersial, dan UKM.
                </Body>
                <Body>
                  BCA mobile adalah aplikasi perbankan seluler dengan jumlah
                  ulasan terbanyak dibandingkan pesaingnya di Google Play
                  (813.002 ulasan per 02 Oktober 2020), sementara para
                  kompetitor — BRI Mobile, Mandiri Online, BNI Mobile Banking,
                  Jenius, dan OCBC NISP — hanya mengumpulkan total 933.074
                  review. Dari ulasan di Play Store dan App Store muncul
                  beberapa insight saat menggunakan BCA mobile, yaitu interface
                  yang terkesan jadul dan proses transfer yang menyulitkan user
                  saat bertransaksi. Dari situ, tim mencoba meriset apakah
                  pengguna BCA mobile memiliki masalah yang sama, lalu
                  mengembangkannya agar membantu pengguna BCA mobile.
                </Body>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { v: "813K+", l: "Ulasan BCA Mobile di Google Play" },
                  { v: "933K", l: "Total review gabungan kompetitor" },
                  { v: "02/10", l: "Periode data ulasan diobservasi" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-white/[0.07] bg-surface p-5"
                  >
                    <p className="text-2xl font-bold tracking-tight text-white">
                      <span className="gradient-text">{s.v}</span>
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ============ DESIGN PROCESS ============ */}
            <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Design Process" title="Alur kerja yang dipakai" step="02" />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Search,
                    n: "01",
                    t: "Research",
                    items: ["Observasi", "Review Play Store", "Usability Test", "User Research", "Competitive Analysis"],
                    color: "from-[#fb4157]/30 to-[#fb4157]/0 border-[#fb4157]/30",
                  },
                  {
                    icon: Users,
                    n: "02",
                    t: "Define",
                    items: ["User Persona", "Pain Point", "Main Focus"],
                    color: "from-[#fde65c]/20 to-transparent border-[#fde65c]/25",
                  },
                  {
                    icon: Layers,
                    n: "03",
                    t: "Design",
                    items: ["User Flow", "Crazy 8's", "Design Guide", "Hi-fi Prototype"],
                    color: "from-[#50e3c2]/20 to-transparent border-[#50e3c2]/25",
                  },
                  {
                    icon: MessageSquare,
                    n: "04",
                    t: "Test",
                    items: ["Usability Testing", "Iterate"],
                    color: "from-[#d033ff]/20 to-transparent border-[#d033ff]/25",
                  },
                ].map((p) => (
                  <div
                    key={p.t}
                    className={cn(
                      "group rounded-2xl border bg-gradient-to-b p-6 transition-transform duration-300 hover:-translate-y-1.5",
                      p.color
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-white">
                        <p.icon className="h-4 w-4" />
                      </span>
                      <span className="text-2xl font-bold text-white/10 transition-colors group-hover:text-white/20">
                        {p.n}
                      </span>
                    </div>
                    <h4 className="mb-3 text-lg font-semibold text-white">{p.t}</h4>
                    <ul className="space-y-1.5">
                      {p.items.map((it) => (
                        <li key={it} className="text-[13px] text-muted">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ============ RESEARCH ============ */}
            <section id="research" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Phase 01" title="Research" step="01" />

              {/* Observe */}
              <h3 className="mt-10 mb-4 text-lg font-semibold text-white">
                1. Observe — Asumsi awal
              </h3>
              <Body>
                Saya memulai dengan asumsi masalah tentang BCA mobile berdasarkan
                pengalaman saat menggunakan aplikasi, yaitu beberapa hal yang
                terasa mengganggu dalam alur transaksi:
              </Body>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Interface yang terlalu jadul",
                  "Proses transfer yang rumit",
                  "Tidak ada download / share bukti hasil transaksi",
                  "Periode mutasi terlalu pendek — hanya 7 hari untuk pengecekan data",
                ].map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-surface px-4 py-3 text-sm text-white/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fde65c]" />
                    {a}
                  </div>
                ))}
              </div>

              {/* Usability Testing */}
              <h3 className="mt-14 mb-4 text-lg font-semibold text-white">
                2. Usability Testing
              </h3>
              <Body>
                Untuk memahami masalah user saat menggunakan aplikasi, saya dan
                tim melakukan uji coba langsung dengan pengguna aplikasi melalui
                serangkaian skenario dan pertanyaan berikut:
              </Body>

              <CaseImage
                src={researchVisual}
                alt="Sesi usability testing BCA Mobile"
                aspect="aspect-[1429/1188]"
                caption="Kegiatan usability testing bersama pengguna BCA mobile."
              />

              <div className="space-y-3">
                {[
                  {
                    s: "Coba anda explore aplikasi secara keseluruhan, lihat dan alami bagaimana aplikasi tersebut menurut anda.",
                    q: "Menurut anda, seperti apa design interface aplikasi ini?",
                  },
                  {
                    s: "Coba anda lakukan transfer ke rekening lain dengan tujuan bank yang sama dan bank yang berbeda.",
                    q: "Bagaimana menurut anda proses transfer yang mengharuskan anda mendaftarkan nomor rekening tujuan sebelum melakukan transaksi?",
                  },
                  {
                    s: "Setelah melakukan transaksi, bagaimana anda mengirim atau mendownload bukti transfer/pembayaran di media sosial?",
                    q: "Dapatkah anda membagikan atau mendownload bukti transfer kepada teman atau orang lain?",
                  },
                  {
                    s: "Coba anda masuk dengan memasukkan kode akses dan tunggu sejenak.",
                    q: "Bagaimana menurut anda keamanan akses aplikasi jika ditambah fitur fingerprint?",
                  },
                  {
                    s: "Coba anda masuk ke bagian mutasi, lihat transaksi bulan lalu, dan download mutasi pada periode yang diinginkan.",
                    q: "Bagaimana menurut anda metode periode mutasi?",
                  },
                ].map((sc, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.07] bg-surface p-5"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-[11px] font-bold text-white/70">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/70">
                        <span className="font-semibold text-white/90">Skenario: </span>
                        {sc.s}
                      </p>
                    </div>
                    <p className="ml-9 text-sm text-[#ff6c6b]">
                      <span className="font-semibold">Pertanyaan: </span>
                      {sc.q}
                    </p>
                  </div>
                ))}
              </div>

              {/* User Research */}
              <h3 className="mt-14 mb-4 text-lg font-semibold text-white">
                3. User Research
              </h3>
              <Body>
                Setelah uji usability, tim melakukan interview kepada 5 pengguna
                berusia 20–50 tahun dengan demografi yang variatif. Wawancara ini
                bertujuan untuk lebih memvalidasi masalah sekaligus menemukan
                pain point, needs, dan goals dari setiap peserta:
              </Body>
              <div className="space-y-3">
                <CheckItem highlight>
                  Pengalaman pengguna saat menggunakan BCA mobile dinilai
                  bermanfaat untuk bertransaksi — presentasi 100%.
                </CheckItem>
                <CheckItem>Visual tampilan aplikasi dinilai perlu ditingkatkan kualitasnya agar lebih nyaman.</CheckItem>
                <CheckItem>
                  Pengguna usia 40–50 merasa kesulitan dengan proses transfer
                  yang rumit; pengguna muda menyarankan proses yang lebih simple,
                  tidak perlu pindah task/frame. Belum ada button share bukti
                  transfer sehingga pengguna harus screenshot untuk mengirim bukti.
                </CheckItem>
                <CheckItem>
                  Periode mutasi kurang efisien — pengguna hanya bisa melihat 7
                  hari histori transaksi, itupun hanya dalam jangka 31 hari, bulan
                  kemarin tidak bisa.
                </CheckItem>
              </div>

              <CaseImage
                src={userResearchVisual}
                alt="Riset dan komparasi aplikasi BCA Mobile"
                aspect="aspect-[997/771]"
                caption="Hasil riset & perbandingan fitur dengan kompetitor."
              />

              {/* Competitive Analysis */}
              <h3 className="mt-14 mb-4 text-lg font-semibold text-white">
                4. Competitive Analysis
              </h3>
              <Body>
                Setelah user research yang membandingkan aplikasi mobile BCA
                dengan mobile banking lain, tim melakukan analisis kompetitif
                untuk mengumpulkan dan membandingkan fitur BCA mobile dengan
                aplikasi lain. Disimpulkan bahwa di antara pesaingnya, aplikasi
                ini tertinggal dalam hal fitur seperti:
              </Body>
              <div className="grid gap-4 lg:grid-cols-2">
                <InsightCard title="Gap dari kompetitor">
                  <ul className="space-y-2">
                    {[
                      "Interface yang lebih modern dan nyaman dilihat",
                      "Penggunaan warna terang dan minimal agar nyaman",
                      "Proses transaksi yang simple, mudah, dan detail",
                      "Bukti transfer yang dapat dikirim atau di-download",
                      "Periode mutasi jangka panjang dan dapat di-download",
                    ].map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </InsightCard>
                <InsightCard title="Kesimpulan tim" tone="accent">
                  <p>
                    Kompetitor unggul pada modernitas tampilan, kesederhanaan
                    alur transaksi, serta fleksibilitas bukti transfer dan
                    periode mutasi — menjadi panduan utama perbaikan BCA mobile.
                  </p>
                </InsightCard>
              </div>
            </section>

            {/* ============ DEFINE ============ */}
            <section id="define" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Phase 02" title="Define" step="02" />
              <div className="mt-8">
                <Body>
                  Setelah melakukan research, interview, dan competitive
                  analysis, penelitian membantu tim memahami user dan berempati
                  dengan masalah, kebutuhan, serta goals pengguna mobile BCA.
                  Masalah yang teridentifikasi divisualisasikan agar tim
                  mendapatkan solusi yang bisa dikembangkan.
                </Body>

                <h3 className="mt-10 mb-6 text-lg font-semibold text-white">
                  A. Pain Point
                </h3>

                {/* 1 */}
                <div>
                  <p className="mb-3 font-medium text-white">
                    1. Interface
                  </p>
                  <CaseImage
                    src={painInterface}
                    alt="Tampilan antarmuka BCA Mobile lama"
                    aspect="aspect-[1047/618]"
                    caption="Antarmuka aplikasi BCA mobile yang terkesan jadul."
                  />
                </div>

                {/* 2 */}
                <div>
                  <p className="mb-3 mt-8 font-medium text-white">
                    2. Periode Mutasi Transaksi
                  </p>
                  <CaseImage
                    src={painMutasi}
                    alt="Periode mutasi transaksi BCA Mobile"
                    aspect="aspect-[1047/636]"
                    caption="Periode mutasi yang pendek dan tidak bisa di-download."
                  />
                </div>

                {/* 3 */}
                <div className="mt-8">
                  <p className="mb-3 font-medium text-white">
                    3. Proses Transfer sesama BCA dan antar bank
                  </p>
                  <InsightCard title="Masalah" tone="primary">
                    <p>
                      Pada halaman transfer aplikasi aslinya, proses transfer
                      mengharuskan user{" "}
                      <span className="font-semibold text-white">
                        mendaftarkan nomor rekening tujuan terlebih dahulu
                      </span>{" "}
                      dan prosesnya terjadi di frame yang berbeda, sehingga user
                      harus keluar-masuk saat proses transfer. Alur ini membuat
                      pengguna frustrasi karena tidak friendly.
                    </p>
                  </InsightCard>
                </div>

                {/* 4 */}
                <div>
                  <p className="mb-3 mt-8 font-medium text-white">
                    4. Bukti Transfer untuk dibagikan atau di-download
                  </p>
                  <CaseImage
                    src={painBukti}
                    alt="Bukti transfer BCA Mobile yang tidak bisa dibagikan"
                    aspect="aspect-[1047/632]"
                    caption="Tidak ada fitur share/download bukti transaksi."
                  />
                </div>

                {/* User Persona */}
                <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                  B. User Persona
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <CaseImage
                    src={persona1}
                    alt="User persona 1"
                    aspect="aspect-[663/346]"
                    className="my-0"
                  />
                  <CaseImage
                    src={persona2}
                    alt="User persona 2"
                    aspect="aspect-[664/347]"
                    className="my-0"
                  />
                </div>

                {/* Main Focus */}
                <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                  C. Main Focus
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Redesign UI aplikasi",
                    "Memperpanjang periode mutasi dan dapat di-download",
                    "Mempermudah proses transfer",
                    "Membagikan / mendownload bukti transfer atau pembayaran",
                  ].map((f, i) => (
                    <div
                      key={f}
                      className="flex items-center gap-3 rounded-xl border border-[#fb4157]/20 bg-[#fb4157]/[0.06] px-4 py-3 text-sm font-medium text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#fb4157] text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============ DESIGN ============ */}
            <section id="design" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Phase 03" title="Design" step="03" />

              <h3 className="mt-10 mb-6 text-lg font-semibold text-white">
                A. User Flow
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-sm font-medium text-white/70">
                    1. User Flow sebelum redesign
                  </p>
                  <CaseImage
                    src={flowBefore}
                    alt="User flow BCA Mobile sebelum redesign"
                    aspect="aspect-[1000/933]"
                    className="my-6"
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-white/70">
                    2. User Flow setelah redesign
                  </p>
                  <CaseImage
                    src={flowAfter}
                    alt="User flow BCA Mobile setelah redesign"
                    aspect="aspect-[1051/826]"
                    className="my-6"
                  />
                </div>
              </div>

              <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                B. Crazy 8&apos;s
              </h3>
              <CaseImage
                src={crazy8}
                alt="Sketsa Crazy 8's"
                aspect="aspect-[529/564]"
                className="my-6 mx-auto max-w-md"
                caption="Sketsa eksplorasi ide dengan metode Crazy 8's."
              />

              {/* Design Guide */}
              <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                C. Design Guide
              </h3>
              <div className="rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Brand Palette
                    </p>
                    <div className="space-y-3">
                      {[
                        { c: "#002245", n: "Primary · Navy", t: "Border/BG utama" },
                        { c: "#9EBBD3", n: "Accent · Sky", t: "Aksen & highlight" },
                        { c: "#FFFFFF", n: "Surface", t: "Latar utama" },
                        { c: "#EEEEEE", n: "Surface muted", t: "Kartu & field" },
                        { c: "#040404", n: "Text", t: "Kontras tinggi" },
                      ].map((sw) => (
                        <div key={sw.c} className="flex items-center gap-4">
                          <span
                            className="h-10 w-10 shrink-0 rounded-xl border border-white/15"
                            style={{ background: sw.c }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {sw.n}
                            </p>
                            <p className="text-xs text-muted">
                              {sw.c} · {sw.t}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Type Scale
                    </p>
                    <div className="space-y-3">
                      <div className="border-l-2 border-[#fb4157] pl-4">
                        <p className="text-2xl font-bold text-white">Headline</p>
                        <p className="text-xs text-muted">Bold 36–48px</p>
                      </div>
                      <div className="border-l-2 border-white/15 pl-4">
                        <p className="text-lg font-semibold text-white">Subheading</p>
                        <p className="text-xs text-muted">SemiBold 24px</p>
                      </div>
                      <div className="border-l-2 border-white/15 pl-4">
                        <p className="text-base text-white">Body</p>
                        <p className="text-xs text-muted">Regular 16px / 24px line</p>
                      </div>
                      <div className="border-l-2 border-white/15 pl-4">
                        <p className="text-sm text-muted">Caption & Label</p>
                        <p className="text-xs text-muted">Regular 12–14px</p>
                      </div>
                    </div>
                    <p className="mt-6 text-[13px] leading-relaxed text-muted">
                      Aksesibilitas menjadi pertimbangan utama — ukuran tombol dan
                      ikon diperbesar dengan kontras yang cukup agar nyaman bagi
                      pengguna lanjut usia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prototype */}
              <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                D. Prototype
              </h3>

              <div>
                <p className="mb-3 font-medium text-white">1. Homepage</p>
                <CaseImage
                  src={screenHome}
                  alt="Homepage BCA Mobile hasil redesign"
                  aspect="aspect-[994/708]"
                  caption="Homepage setelah redesign — ringkasan saldo, menu utama, dan promo terpusat."
                />
              </div>

              <div>
                <p className="mb-3 mt-8 font-medium text-white">2. M-Transfer</p>
                <CaseImage
                  src={screenXfer}
                  alt="Halaman M-Transfer"
                  aspect="aspect-[999/523]"
                  caption="M-Tansfer diganti menjadi M-Transaksi."
                />
                <Body>
                  Pada M-Tansfer, tim mengubahnya menjadi{" "}
                  <span className="font-semibold text-white">M-Transaksi</span>{" "}
                  yang memuat fitur transfer (dengan proses transfer dan virtual
                  account), payment, dan commerce untuk membantu pengguna dalam
                  transaksi, plus daftar transaksi terakhir agar pengguna tahu
                  aktivitas terakhir bertransaksi.
                </Body>
              </div>

              <div>
                <p className="mb-3 mt-8 font-medium text-white">
                  3. Proses Transfer dan share bukti transfer
                </p>
                <CaseImage
                  src={screenXferFlow}
                  alt="Alur proses transfer dan share bukti"
                  aspect="aspect-[997/522]"
                  caption="Alur transfer yang disederhanakan, lengkap dengan fitur share & download bukti."
                />
                <Body>
                  Pada halaman transfer aplikasi aslinya, user wajib
                  mendaftarkan nomor rekening tujuan yang berada di frame
                  berbeda, sehingga pengguna harus keluar-masuk selama proses
                  transfer — alur yang membuat frustrasi. Tim mempersingkat
                  proses transaksi dalam satu fitur yang dapat menambahkan nomor
                  akun sekaligus menyimpannya, serta membuat fitur untuk
                  menyimpan atau membagikan bukti transfer sebagai tanda bukti
                  transaksi.
                </Body>
              </div>

              <div>
                <p className="mb-3 mt-8 font-medium text-white">4. Periode Mutasi</p>
                <CaseImage
                  src={screenMutasi}
                  alt="Periode mutasi transaksi yang panjang"
                  aspect="aspect-[997/522]"
                  caption="Periode mutasi panjang dengan pengaturan tanggal dan fitur download."
                />
                <Body>
                  Periode mutasi dibuat dengan jangka waktu panjang dan dapat
                  diakses hingga 1 tahun. Pengguna dapat mengatur tanggal awal
                  dan akhir yang ingin dilihat, ditambah fitur download file
                  untuk penyimpanan pengguna.
                </Body>
              </div>

              <h3 className="mt-14 mb-6 text-lg font-semibold text-white">
                Tambahan Halaman Lain
              </h3>

              <div>
                <p className="mb-3 font-medium text-white">Login Screen</p>
                <CaseImage
                  src={screenLogin}
                  alt="Login screen dengan fingerprint"
                  aspect="aspect-[999/523]"
                  caption="Login screen dengan fingerprint dan ikon show/hide kode akses."
                />
                <Body>
                  Pada halaman login, tim menambahkan fitur sidik jari pada
                  akses kode serta ikon show/hide pada kode akses agar pengguna
                  dapat memastikan apa yang diketik sudah benar.
                </Body>
              </div>

              <div>
                <p className="mb-3 mt-8 font-medium text-white">Feed Banner</p>
                <CaseImage
                  src={screenFeed}
                  alt="Feed banner promo di homepage"
                  aspect="aspect-[996/522]"
                  caption="Fitur feed di navbar untuk promo & berita."
                />
                <Body>
                  Di homepage, tim menambahkan button feed yang awalnya berada
                  di halaman login screen Info-BCA. Mempertimbangkan keluhan
                  user yang kesulitan melihat berita atau promo karena posisinya
                  ada di bagian login screen — user harus keluar terlebih dahulu
                  — tim memutuskan menambahkan fitur feed pada navbar agar
                  pengguna mudah melihat promo/berita.
                </Body>
              </div>
            </section>

            {/* ============ VALIDATE ============ */}
            <section id="validate" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Phase 04" title="Validate" step="04" />

              <h3 className="mt-10 mb-4 text-lg font-semibold text-white">
                Usability Testing Redesigned Result
              </h3>
              <Body>
                Tim melakukan usability test kembali dengan user yang diinterview
                pada awal proses. Tim melakukan test kepada 5 pengguna dengan
                hasil:
              </Body>
              <div className="space-y-3">
                <CheckItem highlight>
                  User terbantu dengan adanya ikon show/hide pada halaman kode akses.
                </CheckItem>
                <CheckItem>
                  Pada proses transfer, pengguna lebih mudah memahami flow hasil
                  redesign karena proses ringkas dan simple.
                </CheckItem>
                <CheckItem>
                  Mutasi sudah lebih baik — pengguna dapat melihat periode
                  transaksi lebih lama dan mudah saat memilih waktu yang diinginkan.
                </CheckItem>
                <CheckItem>
                  Adanya fitur share dan download transaksi membuat pengguna bisa
                  dengan mudah memberikan bukti kepada tujuan transfer tanpa
                  perlu screenshot lagi.
                </CheckItem>
                <CheckItem>
                  Dengan dipindahkannya Info BCA ke homepage, pengguna lebih
                  mudah tahu berita atau promo yang tersedia.
                </CheckItem>
              </div>

              <h3 className="mt-14 mb-4 text-lg font-semibold text-white">
                Iterate
              </h3>
              <InsightCard title="Masukan iterasi berikutnya" tone="primary">
                <ul className="space-y-2">
                  <li>Icon masih kurang informatif</li>
                  <li>Pewarnaan masih harus dikembangkan</li>
                  <li>
                    Saat user ingin show saldo, perlu PIN lagi untuk proteksi dan
                    kenyamanan user
                  </li>
                  <li>Font dan warnanya masih kurang nyaman untuk pengguna</li>
                </ul>
              </InsightCard>
            </section>

            {/* ============ CONCLUSION ============ */}
            <section id="conclusion" className="scroll-mt-32 border-t border-white/[0.06] py-16">
              <SectionTitle eyebrow="Closing" title="Conclusion" step="05" />
              <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-surface p-8 sm:p-10">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#fb4157]/10 blur-[80px]" />
                <div className="relative space-y-5">
                  <Body>
                    Ini pertama kalinya saya membuat study case redesign — dari
                    research sampai validasi. Mendesain ulang aplikasi mobile
                    BCA merupakan pengalaman yang luar biasa dan memberikan
                    banyak ilmu serta pengetahuan baru tentang UX. Yang pertama
                    saya pelajari adalah melakukan observasi dan interview
                    terhadap pengguna BCA mobile; saya menyiapkan pertanyaan dan
                    menjalankan interview sepanjang redesign ini.
                  </Body>
                  <Body>
                    Ada banyak pertimbangan desain karena pengguna BCA mobile
                    berasal dari semua umur, maka tim mempertimbangkan button
                    dan icon khususnya untuk lansia yang penglihatannya sudah
                    berkurang — sebuah pengalaman yang menantang dan menyenangkan
                    untuk bisa mendengar langsung ulasan dari pengguna. Saya ingin
                    mengucapkan terima kasih kepada tim yang terus berjuang sampai
                    final desain. Saya akan terus melakukan study case untuk
                    mendapatkan lebih banyak pengetahuan UX.
                  </Body>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {["User Research", "Usability Testing", "Interaction Design", "Design System"].map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ---------- NEXT ---------- */}
            <div className="border-t border-white/[0.06] py-14">
              <div className="flex flex-col items-center gap-5 rounded-3xl border border-[#fb4157]/25 bg-[linear-gradient(135deg,#0b0d13,#1a0d12)] p-8 text-center sm:p-10">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Selesaikan proyek Anda dengan desain yang{" "}
                  <span className="gradient-text">teruji</span>
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  Dari riset hingga prototipe, saya bantu wujudkan produk yang
                  benar-benar dipahami penggunanya.
                </p>
<div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="rainbow"
                    size="lg"
                    onClick={() =>
                      (window.location.href =
                        window.location.origin + "/#contacts")
                    }
                  >
                    Let&apos;s Talk <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() =>
                      (window.location.href = window.location.origin + "/#work")
                    }
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Work
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}