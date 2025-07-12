import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constants } from "@/constants";

function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-room"],
    mutationFn: async (data: { name: string; description?: string }) => {
      const response = await fetch(`${constants.SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const resData = await response.json();

      return resData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] });
    },
  });
}

export { useCreateRoom };
