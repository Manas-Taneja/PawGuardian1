export interface Env {
  SUPABASE_URL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, env.SUPABASE_URL);

    const headers = new Headers(request.headers);
    headers.set("Host", new URL(env.SUPABASE_URL).host);

    // Handle WebSocket upgrades (Realtime)
    if (request.headers.get("Upgrade") === "websocket") {
      return fetch(target.toString(), {
        method: request.method,
        headers,
        body: request.body,
      });
    }

    const response = await fetch(target.toString(), {
      method: request.method,
      headers,
      body: request.body,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "*");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: responseHeaders });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
