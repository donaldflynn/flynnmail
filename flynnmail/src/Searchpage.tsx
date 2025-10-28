import { Box } from "@mui/material";
import Searchbar from "./components/Searchbar";



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
        bgcolor: "#f1f6fdff",
      }}
    >
      <Searchbar />
    </Box>
  );
}
