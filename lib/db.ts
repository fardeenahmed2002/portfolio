import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // Prefer IPv4. SRV/seed lookups sometimes resolve to an unreachable
        // IPv6 address first on some networks, producing ECONNREFUSED even
        // when the cluster is healthy. Forcing IPv4 avoids that class of flake.
        family: 4,
        serverSelectionTimeoutMS: 15_000,
      })
      .then((m) => {
        cached.conn = m;
        return m;
      })
      // Critical: if the connection attempt fails (e.g. a transient DNS /
      // querySrv refusal), DO NOT keep the rejected promise cached. Clear it
      // so the next request retries instead of permanently failing until the
      // server restarts.
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  return cached.promise;
}

export default dbConnect;
