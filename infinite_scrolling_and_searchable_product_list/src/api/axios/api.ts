import { Data, TGetProduct, TResponse, TSearch } from "../../types/axios.type";
import { ROUTES } from "../api-key/api.key";
import { axiosInstance } from "./axios.instance";
import qs from "qs";

export const getProduct = (query: TGetProduct): Promise<TResponse> => {
  const route = ROUTES.GET_PRODUCTS.url + "?" + qs.stringify(query);
  return axiosInstance.get<TResponse>(route).then((res) => res && res.data);
};

export const getSearchProduct = (query: TSearch): Promise<Data[]> => {
  const route = ROUTES.GET_PRODUCT_SEARCHING.url + "?" + qs.stringify(query);
  return axiosInstance
    .get<TResponse>(route)
    .then((res) => res && res.data.products);
};
