import { useEffect, useState } from "react";
import { getProductByCategoryId } from "../services/product.service";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../redux/cart.slicer";
import { useDispatch } from "react-redux";
import noImage from '../../src/assets/img/noImage.png'
import ContainerComponent from "../UIkit/Container.Component";

const CategoryPageComponent = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getProductByCategoryId(id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const renderProducts = () => {
    if (products.length) {
      return products.map((product, index) => {
        return (

          <div
            className="col-lg-3 col-md-4 col-sm-6 zu-product-item-wrapper"
            key={index}
            >
            <Link to={`/productDetails/${product._id}`}>
              <img
                className="img img-fluid"
                src={
                  product.imgUrl || noImage
                }
                alt="placeholder img"
                />
              <p className="zu-product-item-name">{product.title}</p>
              <p className="zu-product-item-price">${product.price}</p>
            </Link>

            <button
              className="zu-product-item-btn"
              onClick={() => dispatch(addToCart(product))}
              >
              Add to cart
            </button>
          </div>
        );
      });
    }
  };
  return <div className="categoryProducts">{renderProducts()}</div>;
};

export default CategoryPageComponent;
