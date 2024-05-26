import React, { useState } from "react";
import { add_resource } from "../../../assests";
import { useDispatch } from "react-redux";
import Header from "../header";
import { ToastContainer, toast } from "react-toastify";
import { addNewData } from "../../redux/slicers/AllDataSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    icon_url: "",
    tag: "user",
    category: "",
    description: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Item title is required.";
    }

    if (!formData.link) {
      errors.link = "Link is required.";
    } else if (!isValidURL(formData.link)) {
      errors.link = "Please enter a valid URL.";
    }

    if (!formData.icon_url) {
      errors.icon_url = "Icon URL is required.";
    } else if (!isValidURL(formData.icon_url)) {
      errors.icon_url = "Please enter a valid URL.";
    }

    if (!formData.category) {
      errors.category = "Category is required.";
    }

    if (!formData.description) {
      errors.description = "Description is required.";
    }

    return errors;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios
        .get('https://media-content.ccbp.in/website/react-assignment/add_resource.json')
        .then((res) => {
          if(res.status === 200){
            dispatch(addNewData({ data: formData }));
            toast.success("Resource is created successfully.", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) => {
          if(err){
            toast.error("Facing some issue with api", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
          }
        });
    
    } else {
      setErrors(errors);
    }
  };

  const onClickBack = () => {
    navigate("/assignment/home");
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="add-resource-container">
        <div className="element-1">
          <div className="back-link" onClick={onClickBack}>
            <i className="fas fa-angle-left"></i> &nbsp; Users
          </div>
          <div className="form-container">
            <div className="form-element">
              <h1>Item Details</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Item Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="enter item title"
                />
                {errors.title && <span className="error">{errors.title}</span>}

                <label htmlFor="link">Link</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="enter link"
                />
                {errors.link && <span className="error">{errors.link}</span>}

                <label htmlFor="icon_url">Icon URL</label>
                <input
                  type="url"
                  id="icon_url"
                  name="icon_url"
                  value={formData.icon_url}
                  onChange={handleChange}
                  placeholder="enter icon url"
                />
                {errors.icon_url && (
                  <span className="error">{errors.icon_url}</span>
                )}

                <label htmlFor="tag">Tag Name</label>
                <select
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="resources">Resources</option>
                  <option value="request">Requests</option>
                </select>
                {errors.tag && <span className="error">{errors.tag}</span>}

                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="enter category"
                />
                {errors.category && (
                  <span className="error">{errors.category}</span>
                )}

                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="enter description  "
                ></textarea>
                {errors.description && (
                  <span className="error">{errors.description}</span>
                )}

                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src={add_resource} alt="Office" />
        </div>
      </div>
    </>
  );
};
