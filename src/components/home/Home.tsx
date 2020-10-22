import React from "react";
import { Layout } from "../layout/Layout";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <Layout maxWidth="md">
      <h1>HOME</h1>
    </Layout>
  );
};
