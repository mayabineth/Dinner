import React from "react";
import { useGlobalContext } from "../context";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

export default function Error() {
  const { theme } = useGlobalContext();
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <section className="error-page section">
          <div className="error-container">
            <h4>oops! it's a dead end</h4>
          </div>
        </section>
      </Paper>
    </ThemeProvider>
  );
}
