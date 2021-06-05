import React, { Component, Fragment } from 'react';
import Receipt from './Receipt';
import CartContext from './cartContext';
import Swal from 'sweetalert2';

class TotalCalculation extends Component {
  state = { modalShow: false, saleNumber: 101 };

  toggleModal = () => {
    const modalShow = !this.state.modalShow;
    this.setState({ modalShow });
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => (
          <Fragment>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row" width="200px">
                      SubTotal
                    </th>
                    <td>
                      <span>{value.subTotal + ' EUR'}</span>
                      <span style={{ float: 'right', marginRight: '20px' }}>
                        {value.quantity + ' items'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">VAT tax (%)</th>
                    <td style={{ position: 'relative' }}>
                      <textarea
                        onChange={(e) => value.changeVAT(e.currentTarget.value)}
                        name="VAT"
                        placeholder=" N/A"
                        className="textarea"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Discount (%)</th>
                    <td style={{ position: 'relative' }}>
                      <textarea
                        onChange={(e) =>
                          value.changeDiscount(e.currentTarget.value)
                        }
                        name="discount"
                        placeholder=" N/A"
                        className="textarea"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total</th>
                    <td style={{ color: 'green', fontWeight: 'bold' }}>
                      {value.total + ' EUR'}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button
                        className="btn btn-danger"
                        onClick={value.empty}
                        style={{
                          width: '200px',
                          marginLeft: '20px',
                          marginRight: '20px',
                        }}
                      >
                        CANCEL SALE
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={this.toggleModal}
                        style={{ width: '200px', marginLeft: '30px' }}
                        disabled={value.cart.length === 0}
                      >
                        PROCESS SALE
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <Receipt
                show={this.state.modalShow}
                onHide={() => {
                  const saleNumber = this.state.saleNumber + 1;
                  this.setState({ modalShow: false, saleNumber });
                  value.empty();
                  Swal.fire({
                    title: 'Order Placed Successfully!',
                    text: 'Thank You',
                    type: 'success',
                  });
                }}
                salenumber={this.state.saleNumber}
              />
            </div>
          </Fragment>
        )}
      </CartContext.Consumer>
    );
  }
}

export default TotalCalculation;
