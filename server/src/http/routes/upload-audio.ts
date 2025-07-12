import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/conn.ts';
import { schema } from '../../db/schema/index.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:id/audio',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (req, res) => {
      try {
        const { id } = req.params;

        const result = await db
          .insert(schema.questions)
          .values({ roomId: id, question })
          .returning({ id: schema.questions.id })
          .then((r) => r[0]);

        if (!result) {
          throw new Error('Failed to create question');
        }

        return res.status(201).send({ id: result.id });
      } catch {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );
};
