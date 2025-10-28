import PostalMime, { Address } from "postal-mime";
import { convert } from "html-to-text";
import type { D1Database, ExecutionContext } from "@cloudflare/workers-types";

const EMAIL_ENDING = "@dflynn.uk";



type Env = {
  DB: D1Database; // change if your binding name differs
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
      const bodyText = email.text?.trim() || null;
      const bodyHtml = email.html?.trim() || null;
      const timestamp = Date.now();
      const subject = email.subject ?? null;

      // Insert into D1.
      // NOTE: "from" and "to" are reserved words; we quote them.
      // Adjust table name "emails" if necessary.
      const stmt = env.DB.prepare(`
        INSERT INTO emails ("from_address","from_name","to_address","body_text", "body_html","timestamp","subject",
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      // bind params, then run
      const res = await stmt.bind(fromAdress, fromName,toAddress, bodyText, bodyHtml, timestamp, subject).run();
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
