import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { host } = useSelector((state) => state.host);
  return (
    <>
      <div>Home</div>
      <div>{host}</div>
    </>
  );
};
