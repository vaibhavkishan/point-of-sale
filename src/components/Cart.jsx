import React, { Component, Fragment } from 'react';
import TotalCalculation from './TotalCalculation';
import CartContext from './cartContext';

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {(value) => (
          <Fragment>
            <div
              style={{
                backgroundColor: 'gainsboro',
                width: '503px',
                height: '400px',
                overflowY: 'scroll',
              }}
            >
              <table
                className="table table-hover"
                style={{ backgroundColor: 'gainsboro' }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {value.cart.length === 0 ? (
                    <tr className="tablebox">
                      <td rowSpan="4" colSpan="5">
                        <br />
                        <h5>THERE ARE NO PRODUCTS</h5>
                        <br />
                      </td>
                    </tr>
                  ) : (
                    value.cart.map((item) => (
                      <Fragment key={item.name}>
                        <tr>
                          <td>
                            <button
                              className="btn btn-danger btn-circle btn-sm"
                              style={{ borderRadius: '45%' }}
                              onClick={() => value.delete(item)}
                            >
                              X
                            </button>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>
                            <button
                              className="btn-secondary btn-sm"
                              onClick={() => value.decrement(item)}
                            >
                              -
                            </button>
                            {' ' + item.quantity + ' '}
                            <button
                              className="btn-secondary btn-sm"
                              onClick={() => value.increment(item)}
                            >
                              +
                            </button>
                          </td>
                          <td>{item.subTotal}</td>
                        </tr>
                      </Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                backgroundColor: '#f6f6f6',
                width: '503px',
                height: '224px',
              }}
            >
              <TotalCalculation />
            </div>
          </Fragment>
        )}
      </CartContext.Consumer>
    );
  }
}

export default Cart;
