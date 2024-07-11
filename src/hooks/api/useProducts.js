import { httpGetAllProducts } from "@/services/api/requests/products.requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useProducts = (changeState) => {
  const {
    data = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: httpGetAllProducts,
    select: (response) => response.data,
  });

  useEffect(() => {
    refetch();
  }, [changeState, refetch]);

  const options = useMemo(
    () =>
      data.map((option) => ({
        text: `${option.name}`,
        label: `${option.name}`,
        value: option.id,
      })),
    [data]
  );

  return {
    productsData: data,
    productsLoading: rest.isLoading,
    productsError: rest.isError,
    productsOptions: options,
    ...rest,
  };
};

export default useProducts;
