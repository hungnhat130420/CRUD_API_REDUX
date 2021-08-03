import React, { Component } from "react";
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
//import callApi from './../../utils/ApiCaller';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actFetchProductRequest,actDeleteProductRequest} from './../../actions/index'


class ProductListPage extends Component {
 


    componentDidMount(){
      this.props.fetchAllProducts();
     
    }

    findIndex = (products,id)=>{
      var result = -1;
       products.forEach((product,index)=>{
           if(product.id===id){
               result = index;
           }
       })

      return result;
   }

    onDelete = (id)=>{
      this.props.ondeleteProduct(id);

    }
    showProducts = (products)=>{
        var results =null;
        if(products.length>0){
            results = products.map((product,index)=>{
                return(
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete = {this.onDelete}
                    />
                )
            })
        }
        return results;
    }
  render() {
     var {products} = this.props;
 
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>
        <ProductList>
            {this.showProducts(products)}
        </ProductList>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products : state.products
  }
}

const mapDispatchToProps=(dispatch,props)=>{
  return {
      fetchAllProducts : ()=>{
          dispatch(actFetchProductRequest());
      },
      ondeleteProduct : (id)=>{
        dispatch(actDeleteProductRequest(id));
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListPage);