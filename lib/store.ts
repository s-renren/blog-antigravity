
export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

// Global declaration for TypeScript to recognize the global variable
declare global {
  var _postsStore: Post[] | undefined;
}

// Initialize store from global or empty array
// This ensures data persists if the module is reloaded but the process stays alive
const posts: Post[] = globalThis._postsStore || [];

// Save back to global so it persists
if (process.env.NODE_ENV !== 'production') {
  globalThis._postsStore = posts;
}

export function getPosts(): Post[] {
  // Return sorted by date descending
  return [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPost(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function createPost(title: string, body: string): Post {
  const newPost: Post = {
    id: crypto.randomUUID(),
    title,
    body,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
}
