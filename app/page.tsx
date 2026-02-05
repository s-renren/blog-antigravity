import Link from 'next/link';
import { getPosts } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default function Home() {
  const posts = getPosts();

  return (
    <main className="container max-w-5xl mx-auto py-12 px-4">
      {/* Tab-like placeholders */}
      <div className="flex items-center gap-6 mb-8 border-b border-border/40 pb-1 overflow-x-auto">
        <button className="text-foreground font-bold border-b-2 border-primary px-1 pb-3 text-sm whitespace-nowrap">
          Trend
        </button>
        <button className="text-muted-foreground font-medium hover:text-foreground px-1 pb-3 text-sm whitespace-nowrap transition-colors">
          Latest
        </button>
        <button className="text-muted-foreground font-medium hover:text-foreground px-1 pb-3 text-sm whitespace-nowrap transition-colors">
          Timeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-border/50">
            <p className="text-muted-foreground mb-4">No articles found.</p>
            <Link href="/new" className="text-primary hover:underline font-medium">
              Write your first article
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="group block h-full">
              <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="aspect-[1.91/1] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
                  {/* Emoji Placeholder using simple logic or random */}
                  📝
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-bold text-lg leading-snug mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <span>User</span>
                    <span>•</span>
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
