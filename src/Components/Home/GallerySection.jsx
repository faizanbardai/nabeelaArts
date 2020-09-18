import React, { useEffect, useState } from "react";
import Gallery from "react-grid-gallery";
import { api_loadActiveArt } from "../../Services";

export default function GallerySection() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        api_loadActiveArt()
      .then((x) => x.json())
      .then((x) => {
        setImages(x)
      });
      }, []);
  return (
    <div
      className="container"
      style={{
        display: "block",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Gallery
        images={images}
      />
    </div>
  );
}
