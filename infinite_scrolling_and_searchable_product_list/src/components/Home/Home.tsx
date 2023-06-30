import { HomeProvider } from "./Home.context";
import ProductList from "./ProductList/ProductList";

const Home = () => {
  return (
    <HomeProvider>
      <ProductList />
    </HomeProvider>
  );
};

export default Home;
