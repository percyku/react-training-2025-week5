import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../components/Loading";

const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const Product = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getMoreInfo = async (id) => {
    navigate(`/product/${id}`);
    // try {
    //   setIsLoading(true);
    //   const res = await axios.get(
    //     `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/product/${id}`,
    //   );
    //   navigate(`/product/${id}`, { state: { productData: res.data } });
    //   console.log(res.data);
    // } catch (error) {
    //   toast.error(`取得產品資料失敗 ${error}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
        );
        console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        toast.error(`取得產品資料失敗 ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mt-4">
      <Toaster />
      <Loading isLoading={isLoading} />
      <div className="row">
        {products?.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>
                    <del>價格:{product.origin_price} </del>元
                  </strong>
                </p>
                <p className="h4 card-text">
                  <strong>價格:</strong> {product.price} 元
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => getMoreInfo(product.id)}
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
