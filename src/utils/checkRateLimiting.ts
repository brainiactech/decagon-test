import Redis from 'ioredis';
const seconds = 60;

const checkRateLimiting = async (token: string, limit: number, errorCallback: (arg0: any) => any) => {
  const redisClient = new Redis();
  if (token) {
    const minute = new Date().getMinutes();
    const key = `${token}-${minute}`;
    const data = await redisClient.get(key);
    if (data >= limit) {
      const timeLeft = await redisClient.ttl(key);
      return errorCallback(timeLeft);
    }
    redisClient.multi().incr(key).expire(key, seconds).exec();
  }
  return true;
};

export default checkRateLimiting;
