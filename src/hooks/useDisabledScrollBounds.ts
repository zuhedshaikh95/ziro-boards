import { useEffect } from "react";

const useDisabledScrollBounds = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");

    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};

export default useDisabledScrollBounds;
