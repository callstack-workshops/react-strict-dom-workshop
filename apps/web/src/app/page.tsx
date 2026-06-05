import { html, css } from "react-strict-dom";
import { Greeting } from "@workshop/ui";

export default function Home() {
  return (
    <html.div style={styles.root}>
      <Greeting name="Workshop" />
    </html.div>
  );
}

const styles = css.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});