import type {EmailRow} from "../../dbTypes";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/inbox/")) {
      const inbox = url.pathname.replace("/api/inbox/", "");
      const emails = await env.DB.prepare("SELECT * FROM emails WHERE to = ? ORDER BY timestamp DESC")
        .bind(inbox).all() as { results: EmailRow[] };
      return Response.json(emails.results);
    }
		return new Response(null, { status: 404 });
  }
} satisfies ExportedHandler<Env>;
