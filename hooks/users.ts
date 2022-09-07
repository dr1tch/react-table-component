import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { IUser } from "../types/users";
const name = ["users"];
export const useFetchUsers = (params?: object) => {
  const queryClient = useQueryClient();
  return useQuery<IUser[], Error, IUser[], string[]>(
    name,
    () =>
      api
        .get<IUser[]>(`/${name}?CONTACT=true&PROFILE=true&USERDEPS=true`)
        .then((res) => res.data),
    {
      initialData: () => queryClient.getQueryData(name),
    }
  );
};
