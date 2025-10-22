import { useMemo } from "react";
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
  }>("/positions");

  const positions = useMemo(() => data?.items ?? [], [data?.items]);

  return {
    positions,
    error,
    loading: isLoading,
  };
};
