import { getPost } from '@/lib/store';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const post = getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main className="pb-20 pt-8 px-4">
            <article className="max-w-[760px] mx-auto bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                {/* Header Image Placeholder */}
                <div className="h-40 sm:h-60 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center text-6xl">
                    📝
                </div>

                <div className="p-6 sm:p-10">
                    <header className="mb-8 pb-8 border-b border-border/40">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-sm">
                                <Link href="#" className="font-medium text-foreground hover:underline">
                                    User Name
                                </Link>
                                <div className="text-muted-foreground text-xs mt-0.5">
                                    {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-slate max-w-none text-foreground/90 leading-loose prose-headings:font-bold prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                        <div className="whitespace-pre-wrap text-lg">
                            {post.body}
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
