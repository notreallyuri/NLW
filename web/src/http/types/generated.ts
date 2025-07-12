type Room = {
  id: string;
  name: string;
  description?: string;
  questionsCount: number;
  createdAt: string;
};

type Question = {
  id: string;
  roomId: string;
  question: string;
  answer: string | null;
  createdAt: string;
};

export type { Room, Question };
