import React from "react";
import { PacmanLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  const override = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <PacmanLoader
      color="#a836d6"
      loading={loading}
      size={50}
      cssOverride={override}
    />
  );
};

export default Spinner;
