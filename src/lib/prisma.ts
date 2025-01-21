import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

/**
 * Initializes a single PrismaClient instance.
 * Ensures a single instance in development using global object to prevent multiple connections.
 */
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    const globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
}

export default prisma;