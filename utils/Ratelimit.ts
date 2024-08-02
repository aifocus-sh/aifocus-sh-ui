import { redis } from "@/lib/upstash";
import { UpstashResponse } from "@/types/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

export const validateRateLimit = async (): Promise<UpstashResponse> => {
    const LIMIT_REQUEST = 2;
    const LIMIT_DURATION = "10m";
    const rateLimit = new Ratelimit(
      {
        redis,
        limiter: Ratelimit.slidingWindow(LIMIT_REQUEST, LIMIT_DURATION)      
      }
    )
    const ip = headers().get('x-forwarded-for');
    const {limit, remaining, success:isPermitted, pending} = await rateLimit.limit(ip!);
    if (!isPermitted) {
      console.log(limit, pending, remaining, isPermitted, `You have exceeded the limit of ${LIMIT_REQUEST} requests, please try again after ${LIMIT_DURATION}`);
      return {isPermitted,  message: `You have exceeded the limit of ${LIMIT_REQUEST} requests, please try again after ${LIMIT_DURATION}` };
    }

    return {isPermitted: true, message: 'Permitted' }
}