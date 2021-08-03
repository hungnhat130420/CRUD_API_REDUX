import * as types from './../constants/ActionTypes';
import callApi from './../utils/ApiCaller';

export const actFetchProducts = (products)=>{
    return{
        type:types.FETCH_PRODUCTS,
        products : products
    }
}

export const actFetchProductRequest=()=>{
    return (dispatch)=>{
        return callApi('products','GET',null)
        .then(res=>{
            dispatch(actFetchProducts(res.data))
        })

    }
}

export const actDeleteProduct = (id)=>{
    return{
        type:types.DELETE_PRODUCT,
        id
    }
}

export const actDeleteProductRequest=(id)=>{
   return dispatch =>{
       return callApi(`products/${id}`,'DELETE',null)
       .then(res=>{
           dispatch(actDeleteProduct(id));
       })
   }
}

export const actAddProduct = (products)=>{
    return{
        type:types.ADD_PRODUCT,
        products
    }
}

export const actAddProductRequest=(products)=>{
    return dispatch =>{
        return callApi('products','POST',products)
        .then(res=>{
            dispatch(actAddProduct(res.data));
        })
    }
 }

 export const actGetProduct = (product)=>{
    return {
        type:types.EDIT_PRODUCT,
        product
    }
 }
 export const actGetProductRequest = (id)=>{
     return dispatch => {
        return callApi(`products/${id}`,'GET',null)
        .then(res=>{
            dispatch(actAddProduct(res.data));
        });
     }
 }

