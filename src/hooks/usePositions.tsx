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
  const { data, error, isLoading } = useSWR<Position[]>("/positions");

  useEffect(() => {
    data && setPositions((prev) => [...prev, ...data]);
  }, [data]);

  return {
    positions,
    error,
    loading: isLoading,
  };
};
