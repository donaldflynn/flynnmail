import PostalMime, { Address } from "postal-mime";
import { convert } from "html-to-text";
import type { D1Database, ExecutionContext } from "@cloudflare/workers-types";

const EMAIL_ENDING = "@dflynn.uk";



type Env = {
  DB: D1Database; // change if your binding name differs
};

const parseContent = (text?: string, html?: string): string | null => {
  // Extract body (prefer plain text, fallback to HTML conversion)
  let body = text;
  if (!body && html) {
    body = convert(html);
  }

  if (!body) {
    return null;
  }

  return body.trim();
};

const parseToAdress = (address: Address[] | undefined): string => {
  if (!address || address.length === 0) {
    throw new Error("No to address found");
  } else {
    const mainAddress = address.find((addr) => addr.address?.endsWith(EMAIL_ENDING))?.address;
    if (!mainAddress) {
      throw new Error("No valid to address found");
    }
    return mainAddress.replace(EMAIL_ENDING, "").toLowerCase();
  }
}

export default {
  async email(message: any, env: Env, ctx: ExecutionContext) {
    try {
      // parse raw email (attachments base64)
      const email = await PostalMime.parse(message.raw, {
        attachmentEncoding: "base64",
      });

      // headers: from/to may be arrays or single values
      const fromAdress = email.from?.address ?? null;
      const fromName = email.from?.name?.trim() || null;
      const toAddress = parseToAdress(email.to);

      const body = parseContent(email.text, email.html);
      const timestamp = Date.now();
      const subject = email.subject ?? null;

      // Insert into D1.
      // NOTE: "from" and "to" are reserved words; we quote them.
      // Adjust table name "emails" if necessary.
      const stmt = env.DB.prepare(`
        INSERT INTO emails ("from_address","to_address","body","timestamp","subject", "from_name")
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      // bind params, then run
      const res = await stmt.bind(fromAdress, toAddress, body, timestamp, subject, fromName).run();
      // if your runtime requires an array: await env.DB.prepare(sql).run([from, to, body, timestamp]);

      // optional: check res for lastInsertRowid or changes
        return new Response("ok", { status: 200 });
      } catch (err) {
      // log for debugging
      console.error("email handler error", err);
      return new Response("error", { status: 500 });
    }
  },
};
