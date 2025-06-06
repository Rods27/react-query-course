import { useCallback, useEffect, useState } from 'react';

import { deletePost, fetchPosts, updatePost } from '../../api';
import { PostDetail } from './PostDetails';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader';
import { IPosts } from '../../interfaces/posts';
import * as S from './styles';
import { Button } from '../Button';
const maxPostPage = 10;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<IPosts>({} as IPosts);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextpage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['posts', nextpage],
        queryFn: () => fetchPosts(nextpage),
      });
    }
  }, [currentPage, queryClient]);

  const {
    data = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000,
    gcTime: 2500,
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId: number) => updatePost(postId),
  });

  const resetMutations = useCallback(() => {
    deleteMutation.reset();
    updateMutation.reset();
  }, [deleteMutation, updateMutation]);

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <>
      <S.DefaultContainer>
        <ul>
          {isLoading ? (
            <Loader />
          ) : (
            data.map((post) => (
              <li
                key={post.id}
                className="post-title"
                onClick={() => {
                  setSelectedPost(post);
                  resetMutations();
                }}
              >
                {post.title}
              </li>
            ))
          )}
        </ul>
        <div className="pages">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
              resetMutations();
              setSelectedPost({} as IPosts);
            }}
          >
            Previous page
          </Button>
          <span>Page {currentPage}</span>
          <Button
            disabled={currentPage >= maxPostPage}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
              resetMutations();
              setSelectedPost({} as IPosts);
            }}
          >
            Next page
          </Button>
        </div>
      </S.DefaultContainer>
      <hr style={{ border: 'none' }} />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </>
  );
};

export default Posts;
