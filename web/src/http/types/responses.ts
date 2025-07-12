import type { Question, Room } from "./generated";

type CreateQuestionResponse = Pick<Question, "id" | "answer">;

type CreateRoomResponse = {
  id: string;
};

type GetRoomQuestionsResponse = (Omit<Question, "roomId"> & { isGeneratingAnswer: boolean })[];
type GetRoomsResponse = Room[];

export type {
  CreateQuestionResponse,
  CreateRoomResponse,
  GetRoomQuestionsResponse,
  GetRoomsResponse,
};
