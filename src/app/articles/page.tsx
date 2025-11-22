import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4">
            Articles
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {articles.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            No articles found. Add Markdown to <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">src/articles</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
            {articles.map((article) => {
             
              const cleanPreview = article.content
                .replace(/[#_*>\[\]`]/g, "")
                .slice(0, 160)
                .trim();

              // Format date nicely
              const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col h-full border border-gray-700/50 bg-gradient-to-br from-gray-900/60 to-gray-800/40 hover:from-gray-800/80 hover:to-gray-700/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-700/20 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 overflow-hidden bg-gray-800">
                    <Image
                      src={article.image || `/articles/${article.slug}/image2.jpg`}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 line-clamp-2">
                      {article.title}
                    </h2>
                    
                    {/* Date */}
                    <p className="text-sm text-gray-400 mb-4 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      {formattedDate}
                    </p>
                    
                    {/* Preview Text */}
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      {cleanPreview}...
                    </p>
                    
                    {/* Read More Link */}
                    <div className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-semibold group/link">
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">Read more</span>
                      <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
