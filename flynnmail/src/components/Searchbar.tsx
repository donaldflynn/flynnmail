import { Box, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Searchbar: React.FC<{defaultString?: string, autoFocus?: boolean}> = ({defaultString, autoFocus}) => {
    const [value, setValue] = React.useState(defaultString || "");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inbox = value.trim();
        if (!inbox) return;
        navigate(`/inbox/${encodeURIComponent(inbox)}`);
    }
    return (
            <Box component="form" autoComplete="off" sx={{ width: "75vw", maxWidth: "1000" }} onSubmit={handleSubmit}>
            {/* <input type="text" name="prevent_autofill" autoComplete="off" style={{ display: "none" }} /> */}
                <TextField
                autoFocus={autoFocus !== false}
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
        )
}

export default Searchbar