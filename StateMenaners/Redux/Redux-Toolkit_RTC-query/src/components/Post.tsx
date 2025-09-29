import { FC } from 'react';
import { useDeletePost } from './postHooks/useDeletePost';
import { useParams } from 'react-router';
import { useGetPostQuery } from '../store/api/posts';
// import { useNavigate, useParams } from 'react-router';
// import { useDeletePostMutation, useGetPostQuery } from '../store/api/posts';

export const Post: FC = () => {
  const { postId } = useParams();
  const { data: post, isFetching } = useGetPostQuery(Number(postId));
  // const [deletePost, { isLoading: isFetchingDelete }] = useDeletePostMutation();
  // const navigate = useNavigate();

  // const onDeletePost = async (postId: number) => {
  //   await deletePost(postId);
  //   navigate('/')
  // };

  const {onDeletePost, isLoadingDelete} = useDeletePost()
  
  if (isFetching || isLoadingDelete) {
    return <h2>...Loading</h2>;
  }

  if (!post) {
    return <h3>No data</h3>;
  }

  return (
    <div className='post'>
      <h3> Post {post.id}</h3>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => onDeletePost(Number(postId))}>Delete</button>
    </div>
  );
};
