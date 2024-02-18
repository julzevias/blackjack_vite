const ImageWithLoading = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <>
      <div className="card-container">
        <img src={src} alt={alt} className="card d-flex" />
      </div>
    </>
  );
};

export default ImageWithLoading;
