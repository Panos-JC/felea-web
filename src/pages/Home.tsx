import React from "react";
import { Layout } from "../components/Layout";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <Layout maxWidth="md">
      <h1>HOME</h1>
    </Layout>
  );
};
