import { useQuery } from "@tanstack/react-query";
import { LEADER_ENDPOINT } from "../utils/constants";
import { get } from "../utils/fetch";
import { LeadersRes } from "../utils/types";

const fetchLeaders = async () => {
  const leaders = (await get(LEADER_ENDPOINT)) as LeadersRes;

  return { leaders: leaders };
};

export const useLeaders = () => {
  const { data, error, ...rest } = useQuery({
    queryKey: [`leaderboard`],
    queryFn: () => fetchLeaders(),
  });

  return { ...data, error, ...rest };
};
