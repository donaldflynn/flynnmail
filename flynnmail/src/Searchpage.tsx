import React from "react";
import { Box, TextField } from "@mui/material";

export default function SearchPage() {
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
        bgcolor: "#d1f1faff",
      }}
    >
      <Box component="form" autoComplete="off" sx={{ width: "75vw", maxWidth: "1000" }}>
        <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: "none" }} />
        <TextField
          fullWidth
          placeholder="Open Mailbox"
          variant="outlined"
          size="medium"
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
