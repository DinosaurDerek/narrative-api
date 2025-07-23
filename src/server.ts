import 'dotenv/config';
import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import envSetup from './plugins/env.js';
import corsSetup from './plugins/cors.js';
import healthRoutes from './routes/health.js';
import summariesRoutes from './routes/summaries.js';
import narrativeRoutes from './routes/narratives.js';
import briefsRoutes from './routes/briefs.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier'],
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// Swagger
await fastify.register(swagger, {
  openapi: {
    info: {
      title: 'Narrative API',
      description:
        'A backend demo that fetches topic-based narratives, generates summaries, and stores briefs.',
      version: '0.1.0',
    },
  },
});
await fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

// Plugins
fastify.register(envSetup);
fastify.register(corsSetup);

// Routes
fastify.register(healthRoutes);
fastify.register(narrativeRoutes);
fastify.register(summariesRoutes);
fastify.register(briefsRoutes);

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 5000,
      host: '0.0.0.0',
    });
    console.log(
      `🚀 Server listening on http://localhost:${process.env.PORT || 5000}`
    );
    console.log(
      `📘 Swagger docs at http://localhost:${process.env.PORT || 5000}/docs`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
