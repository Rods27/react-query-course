import { useQuery } from "@tanstack/react-query";

import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";

import { useLoginData } from "@/auth/AuthContext";
import { queryKeys } from "@/react-query/constants";

async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();

  const { data } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.appointments, userId, userToken],
    queryFn: () => getUserAppointments(userId, userToken)
  })

  return data ?? [];
}
