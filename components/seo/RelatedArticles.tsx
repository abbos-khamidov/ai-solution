import Link from 'next/link';

type Article = {
  slug: string;
  title: string;
};

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#F8FAFC] mb-6">
          Статьи по теме
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group block rounded-xl p-5 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200"
            >
              <span className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#93C5FD] transition-colors line-clamp-2">
                {a.title}
              </span>
              <span className="mt-2 block text-xs text-[#3B82F6] font-medium">
                Читать &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
