import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { api_updateImage, api_add_art, api_update_art, api_delete_art } from "../../Services";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function NewOrUpdateArt(props) {
  const [show, setShow] = useState(false);
  const [_id, set_id] = useState();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [picture, setPicture] = useState(null);
  const [thumbnailWidth, setThumbnailWidth] = useState("");
  const [thumbnailHeight, setThumbnailHeight] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (props.art) {
      const updatedArt = await api_update_art(
        props.art._id,
        { caption, thumbnailWidth, thumbnailHeight },
        localStorage.getItem("token")
      ).then((x) => x.json());
      props.updateArt(updatedArt);
      handleClose();
      setLoading(false);
    } else {
      const data = new FormData();
      data.append("key", "c2a389ce6f580be4c419e46023526cce");
      data.append("image", picture);
      const responseImage = await api_updateImage(data);
      const newArtImage = await responseImage.json();
      const response = await api_add_art(
        {
          src: newArtImage.data.medium
            ? newArtImage.data.medium.url
            : newArtImage.data.image.url,
          thumbnail: newArtImage.data.thumb.url,
          thumbnailWidth,
          thumbnailHeight,
          caption,
        },
        localStorage.getItem("token")
      );
      const newArt = await response.json();
      props.addNewArt(newArt);
      clearInputs();
      handleClose();
      setLoading(false);
    }
  };
  // Clear inputs
  const clearInputs = () => {
    set_id();
    setCaption("");
    setThumbnailWidth("");
    setThumbnailHeight("");
    setPicture(null);
    setPreviewImage(null);
  };
  useEffect(() => {
    if (props.art) {
      set_id(props.art._id);
      setCaption(props.art.caption);
      setThumbnailHeight(props.art.thumbnailHeight);
      setThumbnailWidth(props.art.thumbnailWidth);
      setPreviewImage(props.art.src);
    }
  }, [props.art]);

  return (
    <>
      {!props.art && (
        <button
          type="button"
          className="btn btn-primary btn-sm rounded-pill mx-2"
          onClick={handleShow}
        >
          Add new
        </button>
      )}
      {props.art && (
        <FontAwesomeIcon icon={faPen} size={"xs"} onClick={handleShow} />
      )}

      <Modal size="xl" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.art ? caption : "New Art"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {previewImage && (
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <div
                  style={{
                    display: "table-cell",
                    width: "300px",
                    height: "300px",
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    alt="art"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      display: "block",
                      margin: "0 auto",
                    }}
                    // src="https://picsum.photos/2000"
                    src={previewImage}
                  ></img>
                </div>
              </div>
            )}
            <div className={previewImage ? "col-12 col-md-6" : "col-12"}>
              <Form onSubmit={handleSubmit}>
                {!props.art && (
                  <Form.Group>
                    <Form.Control
                      type="file"
                      required={!props.art}
                      name="picture"
                      accept="image/*"
                      onChange={(e) => {
                        setPicture(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={caption}
                    name="title"
                    disabled={loading}
                    required
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Title"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={thumbnailHeight}
                    name="thumbnailHeight"
                    required
                    disabled={loading}
                    onChange={(e) => setThumbnailHeight(e.target.value)}
                    placeholder="Height"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={thumbnailWidth}
                    name="thumbnailWidth"
                    required
                    disabled={loading}
                    onChange={(e) => setThumbnailWidth(e.target.value)}
                    placeholder="Width"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  {props.art &&
                    (confirmDelete ? (
                      <button
                      type="button"
                        onClick={() => {
                          const artDeleted = api_delete_art(_id, localStorage.getItem("token")).then(x=>x.json());
                          props.removeArt(artDeleted);
                          handleClose();
                        }}
                        className="btn btn-outline-danger"
                      >
                        Sure?
                      </button>
                    ) : (
                      <button
                      type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    ))}
                  {!loading ? (
                    <>
                      {props.art && (
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      )}
                      {!props.art && (
                        <button className="btn btn-primary" type="submit">
                          Save
                        </button>
                      )}
                    </>
                  ) : (
                    <button variant="btn btn-secondary" disabled>
                      <div className="d-flex">
                        <Loader
                          type="Puff"
                          color="blue"
                          height={10}
                          width={10}
                        />
                        <div>-- Loading</div>
                      </div>
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
