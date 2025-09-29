import { useNavigate } from 'react-router';
import { useDeletePostMutation } from '../../store/api/posts';

interface DeletePostMutation {
  onDeletePost: (postId: number) => Promise<void>; // Типизируем функцию
  isLoadingDelete: boolean;
}

export const useDeletePost = (): DeletePostMutation => {
  const [deletePost, { isLoading: isLoadingDelete }] = useDeletePostMutation();
  const navigate = useNavigate();

  const onDeletePost = async (postId: number) => {
    await deletePost(postId); // Здесь нужно указать тип для postId
    navigate('/');
  };

  return { onDeletePost, isLoadingDelete }; // Возвращаем объект
};