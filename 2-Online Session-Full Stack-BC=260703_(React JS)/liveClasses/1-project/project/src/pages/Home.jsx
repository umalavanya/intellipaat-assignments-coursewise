import React, { useMemo } from "react";
import productsData from "../data/productsData";
import ProductsCard from "../components/ProductsCard";

const Home = () => {

  const productList = useMemo(() => {
    return productsData.map(item => (
      
      <ProductsCard key={item.id} {...item} />
    ));
  }, [productsData]);

  return (
    <section id="home">
      <div className="container">
        <div className="home_content">
          {productList}
        </div>
      </div>
    </section>
  );
};

export default Home;