import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import './PostDetail.css';
import { IPosts } from './interfaces/posts';
import Loader from './components/Loader';

interface IPostDetails {
  readonly post: IPosts;
}

export function PostDetail({ post }: IPostDetails) {
  const {
    data = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000,
    gcTime: 2500,
  });

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  console.log(data);

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {!isLoading ? (
        <Loader />
      ) : (
        data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))
      )}
    </>
  );
}
