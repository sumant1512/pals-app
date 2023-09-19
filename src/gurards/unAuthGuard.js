import React, { useEffect } from "react";

const UnAuthGuard = ({ component }) => {
  useEffect(() => {
    console.log("UnAuth Guard");
  }, [component]);

  return <React.Fragment>{component}</React.Fragment>;
};

export default UnAuthGuard;
