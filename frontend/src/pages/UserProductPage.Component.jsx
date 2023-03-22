import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserProducts } from "../services/user.service";
import ProductListItemComponent from "../components/productList/components/ProductListItem.Component";
import { toggleLoader } from "../redux/loader.slicer";

function UserProductPageComponent() {
  const { user } = useSelector((store) => store.userStore);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleLoader(true));
    UserProducts(user._id)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  }, []);

  const renderProducts = () => {
    return products.map((el) => (
      <ProductListItemComponent key={el._id} product={el} isEditMode={true} />
    ));
  };

  return (
    <div className="container">
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <div className="row">{renderProducts()}</div>
    </div>
  );
}

export default UserProductPageComponent;
