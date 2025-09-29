import { FC } from 'react';
import { Link } from 'react-router';
import { useDeletePostMutation, useGetPostsQuery } from '../store/api/posts';

export const Posts: FC = () => {
  // const {
  //   data: post,
  //   isFetching,
  //   isLoading,
  // } = useGetPostQuery(1, {
  //   pollingInterval: 3000,
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // });
  const { data: posts, isFetching } = useGetPostsQuery();
  const [deletePost, { isLoading: isFetchingDelete }] = useDeletePostMutation();

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='posts'>
      <h1>
        Posts {posts?.length} {isFetchingDelete ? "...Loading": ''}
      </h1>
      <ul className='posts' style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', height: '300px', overflow: 'auto' }}>
        {posts?.map((post) => {
          return (
            <li key={post.id} style={{ border: '1px solid black' }}>
              <Link to={`post/${post.id}`}>GO TO Post {post.id}</Link>
              <h3>{post.title}</h3>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
