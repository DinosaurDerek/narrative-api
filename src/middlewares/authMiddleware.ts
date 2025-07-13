import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

const API_KEYS = process.env.API_KEYS?.split(',') || [];

export function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
): FastifyReply | void {
  const userKey = request.headers['x-api-key'] as string;

  if (!userKey || !API_KEYS.includes(userKey)) {
    reply.status(401).send({ error: 'Unauthorized: Invalid API key' });

    return;
  }
  done();
}
