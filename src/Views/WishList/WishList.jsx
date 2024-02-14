import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import extractImages from "../../Utils/ImagesFunction";
import { Link } from "react-router-dom";
import { deleteItemList } from "../../Redux/Features/Filters/wishlist";

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlistReducer.list);
  const dispatch = useDispatch();
  const [itemToDelete, setItemToDelete] = useState(null);

  // Manejar la eliminación al cambiar el estado de itemToDelete
  useEffect(() => {
    if (itemToDelete !== null) {
      dispatch(deleteItemList(itemToDelete));
    }
  }, [itemToDelete, dispatch]);

  // Definir la función de eliminación
  const handleDeleteItem = (id) => {
    setItemToDelete(id);
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your favorite products</h1>

        {wishlistItems.length ? (
          wishlistItems?.map((item) => {
            return (
              <div key={item.id} className="flex items-center mb-4">
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                  X
                </button>
                <img src={extractImages(item.images)} alt={`Photo of ${item.title}`} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-700">${item.price}</p>
                  <Link to={`/Detail/${item.title}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Details</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-lg">You have not yet added products to your favorites</h2>
        )}
      </div>
    </div>
  );
};

export default WishList;