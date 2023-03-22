import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/loader.slicer";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AllCategories, RemoveCategory } from "../../services/category.service";
import { toast } from "react-toastify";

const CategoryPageComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isSuccess, isError, isLoading, error, refetch } = useQuery(
    ["getAllCategories"],
    () => AllCategories(),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    dispatch(toggleLoader(isLoading));
  }, [isLoading]);

  const removeCategory = (id) => {
    RemoveCategory(id)
      .then((response) => {
        refetch();
        toast.success("Successfully delteted");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const renderErrorMsg = () => (isError ? <p>{error.message}</p> : null);

  const renderCategories = () => {
    if (isSuccess && data.data.length) {
      return data.data.map((category, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index++}</th>
            <td>{category?.categoryName}</td>
            <td>
              <img
                src={`${category.categoryImg}`}
                alt=""
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
            </td>
            <td>
              <button
                onClick={() => removeCategory(`${category._id}`)}
                className="adminLink"
              >
                Delete category
              </button>
            </td>
            <td>
              <Link to={`edit/${category._id}`} className="adminLink">
                Edit category
              </Link>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div className="categoryDashboard">
      <>
        <h2>Categories</h2>
        <Link to="add-category" className="adminLink">
          Add category
        </Link>
        {renderErrorMsg()}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{renderCategories()}</tbody>
        </table>
      </>
    </div>
  );
};

export default CategoryPageComponent;
