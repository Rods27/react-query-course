
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  const [filter, setFilter] = useState("all");

  const selectFunction = useCallback((data: Staff[]) => {
      if (filter === 'all') return data
      return filterByTreatment(data, filter)
  }, [filter])

  const { data } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFunction,
  })

  return { staff: data ?? [], filter, setFilter };
}

