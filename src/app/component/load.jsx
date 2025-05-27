import Image from "next/image";
import React from "react";

const Load = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      position: "absolute",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f0f0f",
      top: "0",
      left: "0",
    }}>
    <Image src="/bounce.svg" width={50} height={50} />
  </div>
));

export default Load;
