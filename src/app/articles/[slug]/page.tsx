import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <a
            href="/articles"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-semibold mb-8 transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span className="ml-2">Back to Articles</span>
          </a>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-start gap-4 text-sm">
            <p className="text-gray-400 flex items-center">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              {formattedDate}
            </p>
          </div>

          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6"></div>
        </div>

        {/* Article Content */}
        <article
          className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-200 prose-p:leading-relaxed prose-strong:text-purple-300 prose-em:text-gray-300 prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-300 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 prose-img:rounded-lg prose-img:shadow-lg prose-code:text-pink-300 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-hr:border-gray-700 prose-li:text-gray-200 prose-ol:text-gray-200 prose-ul:text-gray-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer Section */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="text-center">
            <a
              href="/articles"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
            >
              <span>← Back to Articles</span>
            </a>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Research et AL
          </p>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
