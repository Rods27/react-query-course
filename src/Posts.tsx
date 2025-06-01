import { useState } from 'react';

import { fetchPosts, deletePost, updatePost } from './api';
import { PostDetail } from './PostDetail';
import { useQuery } from '@tanstack/react-query';
import Loader from './components/Loader';
const maxPostPage = 10;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const {
    data = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000,
    gcTime: 2500,
  });

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <>
      <ul>
        {isLoading ? (
          <Loader />
        ) : (
          data.map((post) => (
            <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
              {post.title}
            </li>
          ))
        )}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
