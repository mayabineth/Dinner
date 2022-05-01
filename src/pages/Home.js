import React from "react";
import { useGlobalContext } from "../context";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

export default function Home() {
  const { theme } = useGlobalContext();
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}></Paper>
    </ThemeProvider>
  );
}
