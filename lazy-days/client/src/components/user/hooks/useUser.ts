import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData()

  const { data } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.user, userId],
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  })

  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      [queryKeys.user, newUser.id],
      newUser,
    )
  }

  function clearUser() {
    queryClient.removeQueries(
      { queryKey: [queryKeys.user, queryKeys.appointments] }
    )
  }

  return { user: data, updateUser, clearUser };
}
