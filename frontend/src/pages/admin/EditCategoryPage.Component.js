import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategory, UpdateCategory } from "../../services/category.service";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EditCategoryPageComponent = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    categoryName: "",
  });
  const [imgString, setImgString] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    id && getEditCategory();
  }, [id]);

  const getEditCategory = () => {
    getCategory(id)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  const onSubmitForm = (values) => {
    onUpdateCategory(values);
  };
  const onUpdateCategory = (values) => {
    console.log(values);
    UpdateCategory({
      ...values,
      categoryImg: imgString || values.categoryImg,
    })
      .then((res) => {
        navigate("/dashboard/categories");
        toast.success("Successfully updated");
      })
      .cathc((error) => {
        toast.error("Something went wrong with update");
      });
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          name="categoryName"
          value={formik.values.categoryName}
          className="form-control"
          onChange={formik.handleChange}
        />
        <label htmlFor="categoryImg" className="form-label">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          name="categoryImg"
          onChange={(e) => handleFileUpload(e)}
        />
        <img src={imgString || category.categoryImg} alt="" />
        <button type="submit" className="btn btn-dark mt-3">
          Update
        </button>
      </form>
    );
  };
  return <div>{renderForm()}</div>;
};

export default EditCategoryPageComponent;
