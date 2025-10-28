import React from "react";
import { useParams } from "react-router-dom";
import type { EmailRow } from "../../dbTypes";
import { Typography, CircularProgress, Table, Box, IconButton, Collapse } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Searchbar from "./components/Searchbar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Letter } from "react-letter";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }

  return 'just now';
}

function Row(props: { row: EmailRow }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          { row.from_name ?? row.from_address ?? "Unknown Sender" }
        </TableCell>
        <TableCell align="right">{row.subject ?? "No Subject"}</TableCell>
        <TableCell align="right">{timeAgo(row.timestamp)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography variant="h6" sx={{ margin: 2, whiteSpace: "pre-wrap" }}>
            {row.from_address}
          </Typography>
          {(row.body_html !== null && row.body_text !== null)? <Letter html={row.body_html} text={row.body_text} />
          : <Typography variant="body1" sx={{ margin: 2, whiteSpace: "pre-wrap" }}>
              {row.body_text ?? "(No content)"}
            </Typography>
          } 
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const EmailTable: React.FC<{ emails: EmailRow[] }> = ({ emails }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>From</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Time Recieved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => (
            <Row key={email.id} row={email} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      )
}

export default function EmailPage() {
  const { inbox } = useParams<{ inbox?: string }>();
  const [emails, setEmails] = React.useState<EmailRow[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!inbox) return;

    let cancelled = false;
    const id = decodeURIComponent(inbox).toLowerCase();

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

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,               // top:0 right:0 bottom:0 left:0
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",     // prevents internal scroll
        bgcolor: "#f1f6fdff",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <Box sx={{ mb: 5 }} >
        <Searchbar defaultString={inbox}/>
      </Box>
      {
        (emails==null) ? <CircularProgress /> : <EmailTable emails={emails} />
      }
    </Box>
  );
}
