import React from "react";
import { AddCategory } from "../../services/category.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategoryPageComponent = () => {
  const [imgString, setImgString] = useState("");
  const [category, setCategory] = useState({
    categoryName: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: category,
    enableReinitialize: true,
    validationSchema: Yup.object({
      categoryName: Yup.string().required("THIS INPUT FIELD IS REQUIRED!"),
    }),
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });
  const onAddCategory = (values) => {
    AddCategory({
      ...values,
      categoryImg: imgString,
    })
      .then((response) => {
        // redirect to category dasboard
        navigate("/dashboard/categories");
        toast.success("Category added");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        navigate("/dashboard/categories");
        toast.error("Something went wrong,please try latter");
      });
  };

  const onSubmitForm = (values) => {
    console.log(values);
    onAddCategory(values);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // native DOM class
      const fileReader = new FileReader();
      // convert file to base64
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setImgString(fileReader.result);
      };
      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    convertFileToBase64(file);
  };

  const renderForm = () => {
    return (
      <form onSubmit={formik.handleSubmit} className="categoryForm">
        <div className="title">
          <label htmlFor="categoryName">Category name</label>
          <input
            type="text"
            name="categoryName"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            className="form-control"
          />
        </div>
        <div className="imgUpload">
          <label htmlFor="categoryImg">Upload image</label>
          <input
            type="file"
            accept="image/*"
            name="categoryImg"
            className="form-control"
            onChange={(event) => handleFileUpload(event)}
          />
        </div>
        <img src={imgString || category.categoryImg} alt="" />
        <button className="btn btn-dark">Add Category</button>
      </form>
    );
  };
  return (
    <div>
      <h2 className="heading">Add category</h2>
      {renderForm()}
    </div>
  );
};

export default AddCategoryPageComponent;
