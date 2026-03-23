import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import blogData from "@/data/blog.json";

type BlogPost = { id: number; title: string; slug: string; excerpt: string; content: string; category: string; date: string; image: string; active: boolean };

export default function BlogPage() {
  const posts = (blogData as BlogPost[]).filter((b) => b.active).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-3">בלוג וטיפים</h1>
            <p className="text-blue-100">מחירי שוק עדכניים, טיפים לקונים ומשקיעים</p>
          </div>
        </section>

        <section className="bg-[#F8FAFB] py-12">
          <div className="max-w-6xl mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">מאמרים בקרוב</h3>
                <p className="text-gray-500">תוכן חדש יתווסף בקרוב</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="h-44 bg-gradient-to-br from-[#1A6B8A]/10 to-[#D4A843]/10 flex items-center justify-center">
                      <span className="text-5xl opacity-30">📰</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{post.category}</span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h2 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#1A6B8A] transition-colors">{post.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
