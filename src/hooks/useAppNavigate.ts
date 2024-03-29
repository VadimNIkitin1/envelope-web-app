import { useNavigate } from 'react-router-dom';
import { schema, store_id } from '../store/productsSlice';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/${!schema ? 10 : schema}/${!store_id ? 1 : store_id}/products`);
  };

  const goToForm = () => {
    navigate(`/${!schema ? 10 : schema}/${!store_id ? 1 : store_id}/form`);
  };

  const goToStartPage = () => {
    navigate(`/${!schema ? 10 : schema}/${!store_id ? 1 : store_id}/`);
  };

  return {
    goBack,
    goToForm,
    goToStartPage,
  };
};
