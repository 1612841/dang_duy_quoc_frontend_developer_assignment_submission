import { useMutation, useQuery } from "react-query";
import { ROUTES } from "../api-key/api.key";
import { getProduct, getSearchProduct } from "../axios/api";
import { TGetProduct, TResponse, TSearch } from "../../types/axios.type";

export const useGetProduct = (query: TGetProduct) => {
  return useQuery<TResponse, any>(
    [ROUTES.GET_PRODUCTS.url, query.skip],
    () => getProduct(query)
  );
};

export const useGetProductSearch = () => {
  return useMutation((query: TSearch) => getSearchProduct(query));
};
