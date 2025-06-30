import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AppointmentDateMap } from "../types";
import { getAvailableAppointments } from "../utils";
import { getMonthYearDetails, getNewMonthYear } from "./monthYear";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

export async function getAppointments(
  year: string,
  month: string
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

const commonOptions = {
  staleTime: 0,
  gcTime: 30000,
}

export function useAppointments() {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [showAll, setShowAll] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { userId } = useLoginData();

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }

  const selectFunction = useCallback((data: AppointmentDateMap, showAll: boolean) => {
    if(showAll) return data;
    getAvailableAppointments(data, userId);
  }, [userId])

  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1)
    queryClient.prefetchQuery({
      queryKey: [queryKeys.appointments, nextMonthYear.year, nextMonthYear.month],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
      ...commonOptions,
    });
  }, [monthYear, queryClient])

  const { data } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
    select: (data) => selectFunction(data, showAll),
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    ...commonOptions,
    });

  return { appointments: data ?? {}, monthYear, updateMonthYear, showAll, setShowAll };
}



