import React, { useEffect, useState } from "react";
import AddUpdateArt from "./AddUpdateArt";
import { api_loadAllArt } from "../../Services";

export default function AdminPanel() {
  const [galleryFromDB, setGalleryFromDB] = useState([])
  const [gallery, setGallery] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    api_loadAllArt()
      .then((x) => x.json())
      .then((x) => {
        setGalleryFromDB(x);
        setGallery(x)
      });
  }, []);
  const addNewArt = (newArt) => {
    setSearchKeyword("");
    setGallery([newArt, ...gallery]);
    setGalleryFromDB([newArt, ...galleryFromDB]);
  };
  const updateArt = (art) => {
    const newGallery = gallery.map((x) => {
      return x._id === art._id ? art : x;
    });
    setGallery(newGallery);
    setGalleryFromDB(newGallery);
  };
  const removeArt = (artDeleted) => {
    setGallery(gallery.filter(art=>art._id === artDeleted._id));
  };
  const searchArt = (event) => {
    event.preventDefault();
    setSearchKeyword(event.target.value);
    if (event.target.value.length > 0) {
      setGallery(galleryFromDB.filter(art=>{
        return art.caption.toLowerCase().includes(event.target.value.toLowerCase())
      }));
    } else {
      setGallery(galleryFromDB);
    }
  };
  return (
    <div className="container-fluid">
      <div className="py-2 d-flex justify-content-between">
          <form className="flex-grow-1">
            <input
              className="form-control rounded-pill py-0"
              autoFocus
              type="search"
              value={searchKeyword}
              onChange={searchArt}
              placeholder="Search Art"
            />
          </form>
          <AddUpdateArt addNewArt={addNewArt} />
          
        
        </div>
      <div className="table-responsive">
        <table className="table table-borderless table-sm ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col" className="text-right d-none d-md-block">H x W</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((art, index) => (
              <tr key={art._id}>
                <th scope="row">{index + 1}</th>
                <td>{art.caption}</td>
                <td className="text-right d-none d-md-block">
                  {art.thumbnailHeight} x {art.thumbnailWidth}
                </td>
                <td>
                  <AddUpdateArt art={art} updateArt={updateArt} removeArt={removeArt}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
