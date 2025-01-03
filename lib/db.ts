import { PrismaClient } from '@prisma/client';

// Define a custom type for the global object
declare const global: {
    prisma?: PrismaClient; // Specify the shape of the global object
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
