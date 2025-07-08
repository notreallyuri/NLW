import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestions } from './http/routes/create-question.ts';
import { createRoom } from './http/routes/create-rooms.ts';
import { getRoomQuestions } from './http/routes/get-room-questions.ts';
import { getRooms } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return { status: 'ok' };
});

app.register(getRooms);
app.register(createRoom);
app.register(getRoomQuestions);
app.register(createQuestions);

app.listen({ port: env.PORT });
