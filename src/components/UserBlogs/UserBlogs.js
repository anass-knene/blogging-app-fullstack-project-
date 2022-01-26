import React, { useContext, useState } from "react";
import { MyContext } from "../Context/context";
import "./UserBlogs.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
export default function UserBlogs() {
  const [show, setShow] = useState(false);
  const handle1Close = () => setShow(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");
  const { userBlog } = useContext(MyContext);

  const blogUpdate = (BLI) => {
    if (handle1Close) {
    }
  };
  const updateBlog = (blID) => {
    blogUpdate(blID);
    handleShow();
  };
  const deleteBlog = (blId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/blogs/${blId}`, {
          method: "DELETE",
          headers: {
            token: token,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              toast.success("Blogs Delete Successfully!");
              console.log(result.success);
            } else {
              toast.error("something went wrong");
            }
          });
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      }
    });
  };

  return (
    <div className="userBlogs">
      {userBlog &&
        userBlog.map((blogUser) => {
          return (
            <div className="userNameDiv" key={blogUser._id}>
              <h1 className="animate__animated animate__fadeInLeft">
                Welcome to your Blog
              </h1>
              <div className="userFullName animate__animated animate__fadeInRight">
                <h2>{blogUser.firstName.toUpperCase()} </h2>
              </div>
            </div>
          );
        })}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // Navigation={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {userBlog &&
          userBlog.map((el) => {
            return (
              <div key={el._id}>
                {el.blogs.map((bl) => {
                  return (
                    <SwiperSlide
                      className="animate__animated animate__bounceInUp"
                      key={bl._id}
                    >
                      <div className="swiperSlide">
                        <img src={bl.image} alt="img" />
                        <div className="card-body">
                          <h3 className="card-title">{bl.title}</h3>
                          <p>{bl.content}</p>
                          <p>{bl.description}</p>
                          <div className="cardBtn">
                            {/* <input
                              type="button"
                              value="Update"
                              onClick={updateBlog}
                              className="btn btn-primary"
                            /> */}
                            <Button
                              variant="primary"
                              onClick={() => updateBlog(bl._id)}
                            >
                              Update
                            </Button>
                            <input
                              type="button"
                              value="Delete"
                              onClick={() => deleteBlog(bl._id)}
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            );
          })}
      </Swiper>
      )
      <Toaster position="top-center" reverseOrder={false} />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handle1Close}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
