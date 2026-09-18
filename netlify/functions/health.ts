import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (_event: HandlerEvent, _context: HandlerContext) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      status: 'ok',
      platform: 'netlify',
      timestamp: new Date().toISOString(),
    }),
  };
};
