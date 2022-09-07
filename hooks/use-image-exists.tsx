import { useEffect, useState } from "react";

const useImageExists = (url) => {
  const [isExists, setIsExists] = useState<boolean>(false);

  useEffect(() => {
    function checkIfImageExists() {
      const img = new Image();
      img.src = url;

      if (img.complete) {
        setIsExists(true);
      } else {
        img.onload = () => {
          setIsExists(true);
        };

        img.onerror = () => {
          setIsExists(false);
        };
      }
    }
    checkIfImageExists();
  }, [url]);
  return isExists;
};
export default useImageExists;
