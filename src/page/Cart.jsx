import { useDispatch, useSelector } from "react-redux";
import { remove, removeAll } from "../redux/Cartslice";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(remove(id));
    toast.success("removed from cart");
  };

  const handleRemoveAll = () => {
    dispatch(removeAll());
    toast.error("all items removed");
  };

  return (
    <>
      <div className="flex justify-between items-center mt-3 p-3">
        <h1 className="text-3xl">Cart.</h1>
        <button
          onClick={handleRemoveAll}
          className={` ${cart.length? "block":"hidden"} px-3 py-2 text-white bg-red-700 rounded-lg`}
        >
          remove all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  p-4  justify-center">
        {cart.length ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="bg-gray-500 flex justify-between text-white border items-center  w-full  relative  p-3 rounded-xl"
            >
              <div className="h-24 w-20 rounded-lg overflow-hidden">
                <img className="w-full object-fill h-full" src={item.image} />
              </div>
                <h1 className="px-3">{item.title || "No Title Available"}</h1>{" "}
                {/* Display default title if item.title is empty */}
              <button
                onClick={() => handleRemove(item.id)}
                className={`px-3  py-1 bg-green-700 rounded-lg`}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center w-full ">no items in the cart</h1>
        )}
        <Toaster />
      </div>
    </>
  );
};

export default Cart;
