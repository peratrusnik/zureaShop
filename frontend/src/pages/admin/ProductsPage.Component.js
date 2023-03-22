import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/loader.slicer";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";
import { GetAllProducts } from "../../services/product.service";

const perPageNums = [4, 8, 12, 16, 20, 24];

const ProductsPageComponent = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const params = useParams();
  const [errMsg, setErrMsg] = useState();
  const [paginationObject, setPaginationObject] = useState({
    page: 0,
    totalItems: 0,
    elPerPage: 12,
  });

  useEffect(() => {
    dispatch(toggleLoader(true));
    GetAllProducts(paginationObject.elPerPage, paginationObject.page)
      .then((response) => {
        // console.log(data);
        setProductList(response.data.elements);
        setPaginationObject(response.data.pagination);
      })
      .catch((error) => {
        console.log(error);
        setErrMsg(error.message);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  }, [params]);

  useEffect(() => {
    !isNaN(paginationObject.page) &&
      GetAllProducts(paginationObject.elPerPage, paginationObject.page)
        .then((response) => {
          setProductList(response.data.elements);
          setPaginationObject(response.data.pagination);
        })
        .catch((error) => {
          console.log(error);
          setErrMsg(error.message);
        });
  }, [paginationObject.page, paginationObject.elPerPage]);
  const renderProductListDashboard = () => {
    if (productList.length) {
      return productList.map((product, index) => {
        return (
          <div
            className="col-lg-3 col-md-4 col-sm-6 zu-product-item-wrapper"
            key={index}
          >
            <Link to={`/productDetails/${product._id}`}>
              <img
                className="img img-fluid"
                src={
                  product.imgUrl ||
                  "https://www.ipcc.ch/site/assets/uploads/sites/3/2019/10/img-placeholder.png"
                }
                alt="placeholder img"
              />
              <p className="zu-product-item-name">{product.title}</p>
              <p className="zu-product-item-price">${product.price}</p>
            </Link>
          </div>
        );
      });
    }
  };
  const renderPaginationNums = () => {
    let pagesNum = Math.ceil(
      paginationObject.totalItems / paginationObject.elPerPage
    );
    let pagesArray = [...Array(pagesNum).keys()];

    return pagesArray.map((number) => (
      <li
        className="page-item"
        key={number}
        onClick={() => {
          setPaginationObject((prevState) => ({
            ...prevState,
            page: number,
          }));
        }}
      >
        <p className="page-link">{number + 1}</p>
      </li>
    ));
  };

  const renderPerPageDropDown = () =>
    perPageNums.map((number, index) => (
      <p
        className="dropdown-item"
        key={index}
        onClick={() =>
          setPaginationObject((prevState) => ({
            ...prevState,
            elPerPage: number,
          }))
        }
      >
        {number}
      </p>
    ));

  return (
    <div className="productDashboard">
      <h2>list</h2>
      {errMsg ? <p>{errMsg}</p> : null}
      <div className="row">{renderProductListDashboard()}</div>
      <div className="row">
        <div className="col-12 my-3 d-flex justify-content-center">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Per page: {paginationObject.elPerPage}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {renderPerPageDropDown()}
            </div>
          </div>
          <nav
            aria-label="Page navigation example"
            className="d-flex justify-content-center"
          >
            <ul className="pagination">
              <li
                className="page-item"
                onClick={() => {
                  // if (paginationObject.page) -> same code
                  if (paginationObject.page > 0)
                    setPaginationObject((prevState) => ({
                      ...prevState,
                      page: prevState.page - 1,
                    }));
                }}
              >
                <p className="page-link">Previous</p>
              </li>
              {renderPaginationNums()}
              <li
                className="page-item"
                onClick={() => {
                  let pagesNum = Math.ceil(
                    paginationObject.totalItems / paginationObject.elPerPage
                  );
                  if (paginationObject.page + 1 < pagesNum)
                    setPaginationObject((prevState) => ({
                      ...prevState,
                      page: prevState.page + 1,
                    }));
                }}
              >
                <p className="page-link">Next</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageComponent;
