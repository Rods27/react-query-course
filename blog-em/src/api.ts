import { IPosts, IComments } from './interfaces/posts';

export async function fetchPosts(pageNum = 1): Promise<IPosts[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`,
  );

  return response.json();
}

export async function fetchComments(postId: number): Promise<IComments[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

export async function deletePost(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function updatePost(postId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PATCH',
    // data: { title: 'REACT QUERY FOREVER!!!!' },
  });
  return response.json();
}
