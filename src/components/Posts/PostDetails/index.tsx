import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../../api';
import { IPosts } from '../../../interfaces/posts';
import Loader from '../../Loader';
import { useEffect } from 'react';
import * as S from './styles';
import { DefaultContainer } from '../styles';
import { Button } from '../../Button';

interface IPostDetails {
  readonly post: IPosts;
  readonly deleteMutation: UseMutationResult<any, Error, number, unknown>;
  readonly updateMutation: UseMutationResult<any, Error, number, unknown>;
}

export function PostDetail({ post, deleteMutation, updateMutation }: IPostDetails) {
  const {
    data = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000,
    gcTime: 2500,
  });

  useEffect(() => {
    if (deleteMutation.isSuccess || updateMutation.isSuccess) {
      const mutateTimeout = setTimeout(() => {
        deleteMutation.reset();
      }, 3000);

      const updateTimeout = setTimeout(() => {
        updateMutation.reset();
      }, 3000);

      return () => {
        clearTimeout(mutateTimeout);
        clearTimeout(updateTimeout);
      };
    }
  }, [deleteMutation, updateMutation]);

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <DefaultContainer>
      <h3 className="title">{post.title}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {!!Object.entries(post).length && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                disabled={!post.id}
                onClick={() => {
                  if (deleteMutation.isPending) return;
                  deleteMutation.mutate(post.id);
                }}
              >
                Delete
              </Button>
              {deleteMutation.isPending && <span className="loading">Deleting the post</span>}
              {deleteMutation.isError && (
                <span className="error">
                  Error deleting the post: {deleteMutation.error.toString()}
                </span>
              )}
              {deleteMutation.isSuccess && <span className="success">The post was deleted</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {updateMutation.isPending && <span className="loading">Updating the post</span>}
              {updateMutation.isError && (
                <span className="error">
                  Error updating the post: {updateMutation.error.toString()}
                </span>
              )}
              {updateMutation.isSuccess && <span className="success">The post was updated</span>}
              <Button
                disabled={!post.id}
                onClick={() => {
                  if (updateMutation.isPending) return;
                  updateMutation.mutate(post.id);
                }}
              >
                Update title
              </Button>
            </div>
          </>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading ? (
        <Loader />
      ) : (
        data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))
      )}
    </DefaultContainer>
  );
}
