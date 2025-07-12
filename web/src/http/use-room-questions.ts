import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types";
import { constants } from "@/constants";

export function useRoomQuestions(id: string) {
  return useQuery({
    queryKey: ["get-questions", id],
    queryFn: async () => {
      const response = await fetch(
        `${constants.SERVER_URL}/rooms/${id}/questions`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch room questions");
      }

      const data: GetRoomQuestionsResponse = await response.json();
      
      return data;
    },
  });
}
