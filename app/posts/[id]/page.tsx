import { getPost } from '@/lib/store';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const post = getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main className="container max-w-3xl mx-auto py-10 px-4">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent">
                <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl leading-tight">{post.title}</CardTitle>
                    <CardDescription>
                        {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
                        {post.body}
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
