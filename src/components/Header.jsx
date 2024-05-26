import { Box } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <header>
      <Box sx={{
        textAlign: "center",
        p:1,
        position: "fixed",
        top:0,
        width:"100%",
        background: "#121212",
      }}>
        <h3>Finance Calculator</h3>
      </Box>
    </header>
  );
};
