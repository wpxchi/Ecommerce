import React, { useState, useEffect } from "react";
import { fetchDetails } from "../../Redux/Features/Filters/details";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import extractImages from "../../Utils/ImagesFunction";
import { setCart, deleteItem } from "../../Redux/Features/Filters/Cartproducts";
import './Detail.css'

const Detailpage = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.clothesDetailsReducer.data);
  const Cart = useSelector((state) => state.productscartReducer.cart);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedProduct, setAddedProduct] = useState(false);

  useEffect(() => {
    dispatch(fetchDetails(title));
  }, [title]);

  useEffect(() => {
    if (details.length > 0) {
      const { id } = details[0];
      const isAddedToCart = Cart.some((item) => item.id === id);
      setAddedProduct(isAddedToCart);
    } else {
      setAddedProduct(false);
    }
  }, [Cart, details]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : details[0].images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < details[0].images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const AddtoCartHandler = () => {
    const { id, images, title, price, category } = details[0];

    const newProduct = {
      id,
      images,
      title,
      price,
      category: category.name,
    };
    dispatch(setCart(newProduct));
    setAddedProduct(true);
  };

  const HandlerRemoveProduct = () => {
    const { id } = details[0];
    dispatch(deleteItem(id));
  };

  return (
    <div className=" bg-gray-500 flex flex-col items-center min-h-screen dark:bg-gray-800 p-4 overflow-hidden">
      {details.map((detail) => (
        <div
          key={detail.id}
          className="max-w-md w-full bg-white dark:bg-gray-700 p-6 mb-8 rounded-md shadow-lg"
        >
          {detail.images.length > 1 && (
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePrevImage}
                className="text-blue-500 dark:text-blue-400"
              >
                {"< Prev"}
              </button>
              <button
                onClick={handleNextImage}
                className="text-blue-500 dark:text-blue-400"
              >
                {"Next >"}
              </button>
            </div>
          )}
          <div className="relative h-70 mb-4 overflow-hidden rounded-md">
            <img
              src={extractImages(detail.images)[currentImageIndex]}
              alt={`Product Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{detail.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {detail.description}
          </p>
          <p className="text-xl font-bold mb-4">${detail.price}</p>
        </div>
      ))}
      {addedProduct ? (
        <div className="flex">
          <Link to={'/Cart'}>
          <button className="bg-green-700 text-white py-2 px-4 rounded-md mr-2">
            View Cart
          </button>
          </Link>
          <button
            onClick={HandlerRemoveProduct}
            className="bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Remove from Cart
          </button>
        </div>
      ) : (
        <button
          onClick={AddtoCartHandler}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};



export default Detailpage;