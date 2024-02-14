import {configureStore} from '@reduxjs/toolkit'
import allclothesReducer from './Features/Filters/Allproducts'
import clothesNameReducer from './Features/Filters/byName'
import byCatReducer from './Features/Filters/byCategories'
import clothesDetailsReducer from './Features/Filters/details'
import productscartReducer from './Features/Filters/Cartproducts'
import wishlistReducer from './Features/Filters/wishlist'

export const store=configureStore({
    reducer:{
        allclothesReducer,
        byCatReducer,
        clothesNameReducer,
        clothesDetailsReducer,
        productscartReducer,
        wishlistReducer

       
    }
})

