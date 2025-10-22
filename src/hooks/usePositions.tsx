import useSWR from "swr";

type Position = {
  id: string;
  company: string;
  address: string;
  status: string;
  gwLocation: string;
  workLocation?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const usePositions = () => {
  const { data, error, isLoading } = useSWR<{
    items: Position[];
    nextCursor: string;
  }>("/placements");

  return {
    positions: data?.items ?? [],
    error,
    loading: isLoading,
  };
};
