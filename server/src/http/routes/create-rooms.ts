import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/conn.ts';
import { schema } from '../../db/schema/index.ts';

export const createRoom: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
        }),
      },
    },
    async (req, res) => {
      try {
        const { name, description } = req.body;

        const result = await db
          .insert(schema.rooms)
          .values({ name, description })
          .returning({
            id: schema.rooms.id,
          })
          .then((r) => r[0]);

        if (!result) {
          throw new Error('Failed to create room');
        }

        return res.status(201).send({ id: result.id });
      } catch {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );
};
