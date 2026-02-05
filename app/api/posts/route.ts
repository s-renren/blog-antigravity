import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/store';

export async function GET() {
    const posts = getPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title || !body.body) {
            return NextResponse.json(
                { error: 'Title and body are required' },
                { status: 400 }
            );
        }

        const post = createPost(body.title, body.body);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
