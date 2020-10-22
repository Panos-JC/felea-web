import { Container } from "@material-ui/core";
import React from "react";
import { NavBar } from "../navbar/NavBar";

interface LayoutProps {
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs" | false;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  maxWidth = "sm",
}) => {
  return (
    <>
      <NavBar />
      <Container maxWidth={maxWidth}>{children as any}</Container>
    </>
  );
};
