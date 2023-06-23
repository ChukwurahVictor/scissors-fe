import useSWR from "swr";
import { fetchUrls, fetchSingleUrl } from "../axios/link";
import urls from "../axios/urls";

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
