import { useEffect, useState } from "react";
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
  const [positions, setPositions] = useState<Position[]>([]);
  const { data, error, isLoading } = useSWR<{
    items: Position[];
    nextCursor: string;
  }>("/positions");

  useEffect(() => {
    data?.items && setPositions((prev) => [...prev, ...data.items]);
  }, [data]);

  return {
    positions,
    error,
    loading: isLoading,
  };
};
