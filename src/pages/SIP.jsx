import { Box } from "@mui/material";
import { SIP } from "../components/SIP";

export const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <SIP />
    </Box>
  );
};
