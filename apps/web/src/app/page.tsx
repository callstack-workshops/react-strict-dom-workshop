"use client";

import { html, css } from "react-strict-dom";

export default function Home() {
  return (
    <html.div data-layoutconformance="strict" style={styles.root}>
      <html.h1 style={styles.title}>RSD on Next.js 16</html.h1>
      <html.p style={styles.body}>Web target rendering with React Strict DOM.</html.p>
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    marginBlockStart: 8,
    color: "#333",
  },
});