import type { Question, Room } from "./generated";

type CreateQuestionRequest = Pick<Question, "question">;

type CreateRoomRequest = Pick<Room, "name" | "description">;

export type { CreateQuestionRequest, CreateRoomRequest };
