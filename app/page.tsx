import Link from 'next/link';
import { getPosts } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  const posts = getPosts();

  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Blog</h1>
        <Button asChild>
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            No posts yet. Create one to get started!
          </p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
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
              </Card>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
