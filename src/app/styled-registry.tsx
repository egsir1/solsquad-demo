// lib/styled-registry.js
"use client"; // Mark as client-side

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet } from "styled-components";

export const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag(); // Clear after rendering
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>; // Client-side: no wrapping

  return sheet.collectStyles(children); // Server-side: collect styles
};
