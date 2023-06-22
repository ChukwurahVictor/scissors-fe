import { fetchUrls } from "../axios/link";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";

// export type DataType = {
//   data: Url[];
// };

// export const reformData = (data: DataType): Url[] =>
//   data?.data?.map((d: Url) => ({ ...d })) || [];

// export type SwrFetchReturnType = {
//   data: {
//     data: Url[]
//   };
//   isGenerating: boolean;
//   isError: AxiosError;
//   mutate: KeyedMutator<any>;
// };

export const useFetchUrls = () => {
  const fetcher = async () => {
    const response = await fetchUrls();
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchUrls,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};

export const useFetchSingleUrl = (id: string) => {
  const fetcher = async () => {
    const response = await fetchSingleUrl(id);
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchUrls,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};
