import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/Cartslice";
import { fetchProduct, STATUS } from "../redux/ProductSlice";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // Renamed input to searchTerm for clarity
  const cartItems = useSelector((state) => state.cart); // Renamed array to cartItems for better readability
  const { data, status } = useSelector((state) => state.product);

  // Memoize the checkInCart function to avoid recalculating it unnecessarily
  const checkInCart = useMemo(() => {
    const itemTitles = cartItems.map((item) => item.title);
    return (item) => itemTitles.includes(item.title);
  }, [cartItems]);

  const handleAdd = (item) => {
    dispatch(add(item));
    toast.success("added to cart")
  };

  const filteredProducts = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <>
      <div className=" w-[90%] lg:w-[50%] m-7 mx-auto rounded-xl border flex ">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className=" px-4 rounded-xl outline-none w-full py-2"
          type="text"
          placeholder="Search products..."
        />
      </div>

      <div className="grid grid-cols-2 pb-4 p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 text-white">
        {status === STATUS.Loading ? (
          <div>Loading...</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-500 p-3 h-60 rounded-xl">
              <div className="h-3/5 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-fit"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col justify-between mt-2">
                <h1 className="h-11 overflow-hidden">
                  {product.title || "No Title Available"}
                </h1>
                <button
                  disabled={checkInCart(product)}
                  onClick={() => handleAdd(product)}
                  className="px-3 py-1 bg-green-700 disabled:bg-orange-600 rounded-lg mt-2"
                >
                  {checkInCart(product) ? "Added" : "Add to cart"}
                </button>
              </div>
            </div>
          ))
        )}
        <Toaster/>
      </div>
    </>
  );
};

export default Home;
