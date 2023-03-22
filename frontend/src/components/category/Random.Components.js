import { useEffect, useState } from "react";
import { RandomCategory } from "../../services/category.service";
import CategoryComponent from "./components/Category.Component";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContainerComponent from "../../UIkit/Container.Component";

const RandomComponents = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    RandomCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCategory]);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const animate = inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 };

  const renderCategories = () => {
    if (category.length) {
      return category.map((item, index) => {
        return <CategoryComponent category={item} key={index} />;
      });
    }
    return <h2>No categories</h2>;
  };

  return (
    <motion.div
      className="categories"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={animate}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ContainerComponent isFluid={true}>
        {renderCategories()}
      </ContainerComponent>
    </motion.div>
  );
};

export default RandomComponents;
