import React, { Component } from "react";
import callApi from "./../../utils/ApiCaller";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {actAddProductRequest,actGetProductRequest} from './../../actions/index';

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtName: " ",
      txtPrice: "",
      chkbStatus: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id);
      
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    //console.log(this.state);
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    var { history } = this.props;
    var products = {
        id : id,
        name : txtName,
        price : txtPrice,
        status : chkbStatus
    }
    if (id) {
      //update
      callApi(`products/${id}`, "PUT", {
        name: txtName,
        price: txtPrice,
        status: chkbStatus,
      }).then((res) => {
        history.push("/product-list");
      });
    } else {
        this.props.onAddProduct(products);
        history.push("/product-list");
    }
  };
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên sản phẩm </label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus}
              />
              Còn hàng
            </label>
          </div>

          <button type="submit" className="btn btn-primary mr-10">
            Lưu lại
          </button>
          <Link to="/product-list" className="btn btn-danger">
            Trở lại
          </Link>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch,props)=>{
    return{
        onAddProduct:(products)=>{
            dispatch(actAddProductRequest(products))
        },
        onEditProduct:(id)=>{
            dispatch(actGetProductRequest(id))  
        }
    }
}
export default connect(null,mapDispatchToProps)(ProductActionPage);
