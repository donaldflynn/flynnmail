import React from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";





export default function SearchPage() {

    const [value, setValue] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inbox = value.trim();
        if (!inbox) return;
        navigate(`/inbox/${encodeURIComponent(inbox)}`);
    }


    return (
    // fixed, fills viewport, prevents scrolling
    <Box
      sx={{
        position: "fixed",
        inset: 0,               // top:0 right:0 bottom:0 left:0
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",     // prevents internal scroll
        bgcolor: "#f1f6fdff",
      }}
    >
      <Box component="form" autoComplete="off" sx={{ width: "75vw", maxWidth: "1000" }} onSubmit={handleSubmit}>
        {/* <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: "none" }} /> */}
            <TextField
            fullWidth
            placeholder="Open Mailbox"
            variant="outlined"
            size="medium"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputProps={{
                autoComplete: "off",
                spellCheck: "false",
                autoCorrect: "off",
                autoCapitalize: "off",
                }}
                sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "32px", bgcolor: "white" },
                    "& .MuiInputBase-input": { fontSize: "1.5rem", padding: "18px 24px" },
                }}
                />
      </Box>
    </Box>
  );
}
