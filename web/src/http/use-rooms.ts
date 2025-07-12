import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types";
import { constants } from "@/constants";

function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${constants.SERVER_URL}/rooms`);

      if (!response.ok) {
        throw new Error("No rooms found");
      }

      const data: GetRoomsResponse = await response.json();

      return data;
    },
  });
}

function useRoom(id: string) {
  return useQuery({
    queryKey: ["get-room", id],
    queryFn: async () => {
      const response = await fetch(`${constants.SERVER_URL}/rooms/${id}`);

      if (!response.ok) {
        throw new Error("Room not found");
      }

      const data = await response.json();

      return data;
    },
  });
}

export { useRooms, useRoom };
