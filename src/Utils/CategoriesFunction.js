import axios from 'axios';

const allCategories= async ()=>{
 
   try {
    const {data}=await axios.get('https://api.escuelajs.co/api/v1/categories')
    return data
   
   } catch (error) {
    window.alert('error')
   } 
   
}
export default allCategories;