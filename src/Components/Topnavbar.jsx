import React, { useState, useEffect } from "react";
import { fetchbyCat } from "../Redux/Features/Filters/byCategories";
import { fetchByNameClothes } from "../Redux/Features/Filters/byName";
import { useDispatch } from "react-redux";
import allCategories from "../Utils/CategoriesFunction";

const Topnavbar = ({ buttons, setButtonspagination }) => {
  const dispatch = useDispatch();
  const [allcategories, setAllCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allCategories();
        setAllCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
   dispatch(fetchbyCat(buttons))
  }, [buttons.categories]); 

  const filterclothes = (e) => {
    const value = e.target.value;
    const category = Number(value);
    setButtonspagination((prevbuttonspagination) => ({ ...prevbuttonspagination, categories: category, offSet: 0}));
  };

  const SearchHandler=(e)=>{
    const value = e.target.value;
     setButtonspagination({...buttons, name:value })
     console.log(buttons.name)
  }

  const SearchProduct =()=>{
    setButtonspagination({...buttons, categories:''})
    dispatch(fetchByNameClothes(buttons))
    setButtonspagination({...buttons, name:'', categories:''})
    
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mr-2 mb-2">
        <input
          type="search"
          placeholder="Search products..."
          className="bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-md z-10"
          onChange={SearchHandler}
          value={buttons.name}
        />
        <button
          onClick={SearchProduct}
          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2 transition duration-300 hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
  
      <div className="flex">
  <button
    value={0}
    onClick={filterclothes}
    className="bg-gray-400 dark:bg-gray-700 text-black font-semibold py-2 px-4 my-4 rounded-md mr-2 transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    All
  </button>

  {allcategories.map((category) => (
    <button
      key={category.id}
      value={category.id}
      onClick={filterclothes}
      className="bg-gray-400 dark:bg-gray-700 text-black font-semibold py-2 px-4 rounded-md mr-2 my-4 transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {category.name}
    </button>
  ))}
</div>
    </div>
  );
};

export default Topnavbar;


