import { useState } from "react";

const ImageWithLoading = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className="card-container">
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{ display: isLoading ? "d-none" : "block" }}
          className="card d-flex"
        />
      </div>
    </>
  );
};

export default ImageWithLoading;
