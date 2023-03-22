import { useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryComponent = (props) => {
  const { category } = props;
  useEffect(() => {}, [category]);

  return (
    <div className="col-md-4 col-sm-12 categoryHolder">
      <div className="categoryHover">
        <div className="categoryWrapper">
          <img src={`${category.categoryImg}`} alt="" />
          <div className="content">
            <h2>{category.categoryName}</h2>
            <Link to={`category/${category._id}`} className="categoryBtn">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
