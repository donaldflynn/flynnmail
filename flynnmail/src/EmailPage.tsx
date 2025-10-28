import React from "react";
import { useParams } from "react-router-dom";
import type { EmailRow } from "../../dbTypes";
import { Stack, Typography, CircularProgress } from "@mui/material";

export default function EmailPage() {
  const { inbox } = useParams<{ inbox?: string }>();
  const [emails, setEmails] = React.useState<EmailRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!inbox) return;

    let cancelled = false;
    const id = decodeURIComponent(inbox);

    (async () => {
      try {
        const res = await fetch(`/api/inbox/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        const data = (await res.json()) as EmailRow[];
        if (!cancelled) setEmails(data);
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? "Unknown error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inbox]);

  if (!inbox) return <Typography>Missing inbox id</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (emails === null) return <CircularProgress />;

  return (
    <>
      <Typography sx={{ mb: 2 }}>
        Your Inbox {decodeURIComponent(inbox)} has {emails.length} emails.
      </Typography>

      {emails.map((email) => (
        <Stack
          key={email.id}
          direction="column"
          spacing={1}
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            bgcolor: "#f9f9f9",
            mb: 2,
          }}
        >
          <Typography fontWeight={600}>{email.from_address}</Typography>
          <Typography variant="body2" color="text.secondary">
            {email.body ?? "No preview"}
          </Typography>
        </Stack>
      ))}
    </>
  );
}
