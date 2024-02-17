import { useState } from "react";
import Loader from "./common/Loader";

const ImageWithLoading = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="card-container">
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{ display: isLoading ? "none" : "block" }}
          className="card d-flex"
        />
      </div>
    </>
  );
};

export default ImageWithLoading;
