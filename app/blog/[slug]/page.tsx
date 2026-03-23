import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";

type BlogPost = { id: number; title: string; slug: string; excerpt: string; content: string; category: string; date: string; image: string; active: boolean };

export async function generateStaticParams() {
  return (blogData as BlogPost[]).map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (blogData as BlogPost[]).find((p) => p.slug === slug && p.active);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/blog" className="text-blue-200 hover:text-white text-sm">← חזרה לבלוג</Link>
            </div>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3 inline-block">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{post.title}</h1>
            <p className="text-blue-200 text-sm">{post.date}</p>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-lg text-gray-600 mb-8 font-medium">{post.excerpt}</p>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>

            <div className="mt-12 bg-[#F8FAFB] rounded-2xl p-8 text-center border border-gray-200">
              <h3 className="font-bold text-[#1A1A2E] mb-2">רוצה לדעת עוד?</h3>
              <p className="text-gray-600 text-sm mb-4">פנה אלי לייעוץ אישי וחינמי</p>
              <Link href="/contact" className="bg-[#1A6B8A] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#155a73] transition-colors">
                צור קשר
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
