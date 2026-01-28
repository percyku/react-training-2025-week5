import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { currency } from "../../utils/filter";
import Loading from "../../components/Loading";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    getCart();
  }, []);

  // 取得購物車列表
  const getCart = async () => {
    try {
      setIsLoading(true);
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart`;
      const response = await axios.get(url);
      setCart(response.data.data);
    } catch (error) {
      toast.error(`得購物車列表失敗 ${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 清除單一筆購物車
  const deleteCart = async (id) => {
    try {
      setIsLoading(true);
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart/${id}`;
      await axios.delete(url);
      toast.success(`刪除成功 `);
      getCart();
    } catch (error) {
      toast.error(`刪除失敗 ${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 清空購物車
  const deleteCartAll = async () => {
    try {
      setIsLoading(true);
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/carts`;
      await axios.delete(url);
      toast.success(`清空購物車成功 `);

      getCart();
    } catch (error) {
      toast.error(`清空購物車失敗 ${error.response.data}`);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新商品數量
  const updateCart = async (cartId, product_id, qty = 1) => {
    try {
      setIsLoading(true);
      const url = `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/cart/${cartId}`;
      const data = {
        product_id: product_id,
        qty,
      };
      await axios.put(url, { data });
      toast.success(`更新商品數量成功 `);
      getCart();
    } catch (error) {
      toast.success(`更新商品數量失敗 ${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Toaster />
      <Loading isLoading={isLoading} />
      {cart?.carts && cart?.carts.length != 0 && (
        <div className="text-end">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={deleteCartAll}
          >
            清空購物車
          </button>
        </div>
      )}

      <table className="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單位</th>
            <th className="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          {cart?.carts &&
            cart?.carts.map((item) => (
              <tr key={item.id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteCart(item.id)}
                  >
                    <i className="bi bi-x" /> 刪除
                  </button>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/product/${item.product_id}`);
                    }}
                  >
                    {item.product.title}
                  </a>
                </td>
                <td>
                  <select
                    name=""
                    id=""
                    className="form-select w-50"
                    value={item.qty}
                    onChange={(e) => {
                      e.preventDefault();
                      updateCart(
                        item.id,
                        item.product_id,
                        parseInt(e.target.value),
                      );
                    }}
                  >
                    {[...Array(20)].map((_, i) => {
                      return (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td>
                  <small className="text-muted">{item.product.unit}</small>
                </td>

                <td className="text-end">{currency(item.final_total)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-end">
              總計
            </td>
            <td className="text-end">{currency(cart?.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
