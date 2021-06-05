import React, { useContext, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import CartContext from './cartContext';

function Receipt(props) {
  const value = useContext(CartContext);
  let today = new Date(),
    time =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear() +
      ' ' +
      today.getHours() +
      ':' +
      today.getMinutes() +
      ':' +
      today.getSeconds();

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ backgroundColor: 'rgb(9, 0, 51)' }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: 'white' }}
        >
          Receipt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ textAlign: 'center' }}>
          Sale No .:.: {'00' + props.salenumber}
        </p>
        <p>Date : {time}</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {value.cart.map((item) => (
              <Fragment key={item.name}>
                <tr style={{ border: 'white' }}>
                  <td>1</td>
                  <td>{item.name}</td>
                  <td>{' ' + item.quantity + ' '}</td>
                  <td>{item.subTotal}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        <span>Total Items : </span>
        <span style={{ marginLeft: '50px', fontWeight: 'bold' }}>
          {value.quantity}
        </span>
        <span style={{ marginLeft: '110px' }}>Total :</span>
        <span
          style={{
            float: 'right',
            marginRight: '30px',
            fontWeight: 'bold',
          }}
        >
          {value.total + ' EUR'}
        </span>
        <div>
          <span style={{ marginLeft: '233px' }}>Discount</span>
          <span
            style={{
              float: 'right',
              marginRight: '55px',
              fontWeight: 'bold',
            }}
          >
            {value.discount + '%'}
          </span>
        </div>
        <div>
          <span style={{ marginLeft: '233px' }}>VAT</span>
          <span
            style={{
              float: 'right',
              marginRight: '55px',
              fontWeight: 'bold',
            }}
          >
            {value.VAT + '%'}
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn"
          onClick={props.onHide}
          style={{ width: '480px', backgroundColor: '#f0ebeb' }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Receipt;
