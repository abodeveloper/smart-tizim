import { useParams } from "react-router-dom";

const ProductCategoryDetailPage = () => {
  const { id } = useParams();

  return <>{id}</>;
};

export default ProductCategoryDetailPage;
