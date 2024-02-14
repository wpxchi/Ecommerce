import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllClothes } from "../../Redux/Features/Filters/Allproducts";
import Cards from "../../Components/Cards";
import extractImages from "../../Utils/ImagesFunction";
import Topnavbar from "../../Components/Topnavbar";
import Bottomnavbar from "../../Components/Bottomnavbar";
import SideBar from "../../Components/Sidebar";
import axios from 'axios'

const Homepage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [buttonspagination, setButtonspagination] = useState({
    limit: 10,
    offSet: 0,
    name: '',
    categories: ''
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const allClothes = useSelector((state) => state.allclothesReducer.data);
  const filteredClothes = useSelector((state) => state.byCatReducer.data);
  const searchedClothes = useSelector((state) => state.clothesNameReducer.data);


  useEffect(() => {
    dispatch(fetchAllClothes(buttonspagination));
  }, [dispatch, buttonspagination]);

  useEffect(()=>{
    setData(allClothes)
  },[allClothes])

  useEffect(()=>{
    setData(filteredClothes)
  },[filteredClothes])

  useEffect(()=>{
    setData(searchedClothes)
  },[searchedClothes])

  const handleNextPage = () => {
    setButtonspagination((prevButtons) => ({ ...prevButtons, offSet: buttonspagination.offSet + 10 }));
    dispatch(fetchAllClothes({ ...buttonspagination, offSet: buttonspagination.offSet + 10 }));
    console.log(buttonspagination.offSet)
  };

  const handlePrevPage = () => {
    if (buttonspagination.offSet >= 10) {
      setButtonspagination((prevButtons) => ({ ...prevButtons, offSet: buttonspagination.offSet - 10 }));
      dispatch(fetchAllClothes({ ...buttonspagination, offSet: buttonspagination.offSet - 10 }));
     
    }
  };


  

  return (
    <div  className="bg-gray-500 max-h-screen">
    
      <SideBar show={show} handleClose={handleClose} handleShow={handleShow} />
      {data.length ? (
        <div className="flex flex-col items-center bg-gray-500 dark:bg-gray-800 p-4">
          <Topnavbar buttons={buttonspagination} setButtonspagination={setButtonspagination} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 justify-center items-center">
            {data.map((item) => (
              <Cards key={item.id} images={extractImages(item.images)[0]} title={item.title} price={item.price} id={item.id} />
            ))}
          </div>
          <div className="my-4 flex items-center justify-between w-full">
      <div>
        {buttonspagination.offSet > 0 &&(
          <button
            onClick={handlePrevPage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-700"
          >
            Prev Page
          </button>
        )}
      </div>
      <div>
        {data.length >= 10 && (
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-700"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
        </div>
      ) : (
        <div className="flex flex-col items-center dark:bg-gray-800 p-4 bg-white-200 max-h-screen">
  <Topnavbar buttons={buttonspagination} setButtonspagination={setButtonspagination} />
  <p className="text-black text-lg font-bold my-8">No products here</p>
</div>
      )}
    </div>
  );
};
  
export default Homepage
