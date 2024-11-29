import { useInfiniteQuery } from "@tanstack/react-query";
import fetchOrders from "../utils/fetchOrders";

const useOrdersQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      fetchOrders({ pageParam }), // Pass pageParam to fetchOrders
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined, // Return undefined instead of null
    initialPageParam: undefined, // Use undefined for initial page param
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};

export default useOrdersQuery;
