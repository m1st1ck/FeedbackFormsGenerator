import React from "react";

function ScrollToBox({ focused, children, index }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (focused === index) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      });
    }
  });

  return <div ref={ref}>{children}</div>;
}

export default ScrollToBox;
