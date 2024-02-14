import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setList, deleteItemList} from "../Redux/Features/Filters/wishlist";
import { useDispatch, useSelector } from "react-redux";

const Cards = ({ title, images, price, id }) => {
  const wishlist = useSelector((state) => state.wishlistReducer.list);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const isAddedToWishlist = wishlist.some((item) => item.id === id);
    setAdded(isAddedToWishlist);
  }, [wishlist, id]);

  const handleWishlist = () => {
    const newProductList = {
      id,
      title,
      images,
      price,
    };

    dispatch(setList(newProductList));
  };


  const handledeleteProduct=()=>{
    dispatch(deleteItemList(id))
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4  mb-4 flex flex-col items-center">
      <img className="size-48 object-cover mb-2 rounded-md" src={images} alt="Product Image" />
      {added ? (
        <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={handledeleteProduct}>
          Remove from Wishlist ❤️
        </button>
      ) : (
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleWishlist}>
          Add to Wishlist 🤍
        </button>
      )}
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">${price}</p>
      <Link to={`/Detail/${title}`}>
        <button className="bg-gray-800 text-white py-2 px-4 rounded-md mt-2">Details</button>
      </Link>
    </div>
  );
};

export default Cards;