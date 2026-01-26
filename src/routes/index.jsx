import FrontendLayout from "../layout/FrontendLayout";

import Home from "../pages/front/Home";
import Cart from "../pages/front/Cart";
import Product from "../pages/front/Product";
import SingleProduct from "../pages/front/SingleProduct";

import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
