import 'dotenv/config';
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import envSetup from './plugins/env.js';
import corsSetup from './plugins/cors.js';
import healthRoutes from './routes/health.js';
import searchRoutes from './routes/narratives.js';

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier'],
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// Register plugins
fastify.register(envSetup);
fastify.register(corsSetup);

// Register routes
fastify.register(searchRoutes);
fastify.register(healthRoutes);

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 5000,
      host: '0.0.0.0',
    });
    console.log(`🚀 Server listening on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
