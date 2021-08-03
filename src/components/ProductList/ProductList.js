import React, { Component } from "react";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Danh sách sản phẩm</h3>
          </div>
          <div className="panel-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã SP</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                  {this.props.children}
              </tbody>  
            </table>
          </div>
        </div>
      </div>
    );
  }
}
