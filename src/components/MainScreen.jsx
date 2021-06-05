import React, { Component } from 'react';
import Cart from './Cart';
import Products from './Products';
import config from '../services/pos.products.json';
import CartContext from './cartContext';

class MainScreen extends Component {
  state = {
    products: [],
    cart: [],
    subTotal: 0,
    VAT: 0,
    discount: 0,
    total: 0,
    totalQuantity: 0,
  };

  componentDidMount() {
    this.setState({ products: config });
    this.calculateSubTotal(this.state.cart);
    this.calculateQuantity(this.state.cart);
  }

  componentDidUpdate(prevProps, prevState) {
    const { subTotal, VAT, discount } = this.state;
    const total = (subTotal * (1 + VAT / 100) * (1 - discount / 100)).toFixed(
      2
    );
    if (prevState.total !== total) {
      this.setState({ total });
    }
  }

  setCart = (product) => {
    const cartObj = {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      subTotal: product.price * product.quantity,
    };

    const cart = [...this.state.cart];

    const index = this.state.cart.findIndex(
      (item) => item.name === product.name
    );

    if (index > -1) {
      cart[index].quantity += 1;
      cart[index].subTotal += parseInt(cart[index].price);
    } else {
      cart.push(cartObj);
    }

    this.setState({ cart });
    this.calculateSubTotal(cart);
    this.calculateQuantity(cart);
  };

  setQuantityIncrement = (product) => {
    const cart = [...this.state.cart];
    const index = cart.findIndex((item) => item.name === product.name);
    cart[index].quantity += 1;
    cart[index].subTotal += parseInt(cart[index].price);
    this.setState({ cart });
    this.calculateSubTotal(cart);
    this.calculateQuantity(cart);
  };

  setQuantityDecrement = (product) => {
    let cart = [...this.state.cart];
    const index = cart.findIndex((item) => item.name === product.name);
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      cart[index].subTotal -= parseInt(cart[index].price);
    } else {
      cart = this.state.cart.filter((item) => item.name !== product.name);
    }
    this.setState({ cart });
    this.calculateSubTotal(cart);
    this.calculateQuantity(cart);
  };

  deleteCartItem = (product) => {
    const cartOriginal = [...this.state.cart];
    const cart = cartOriginal.filter((item) => item.name !== product.name);
    this.setState({ cart });
    this.calculateSubTotal(cart);
    this.calculateQuantity(cart);
  };

  emptyCart = () => {
    const cart = [];
    this.setState({ cart });
    this.calculateSubTotal(cart);
    this.calculateQuantity(cart);
  };

  onChangeVAT = (value) => {
    this.setState({ VAT: value });
  };

  onChangeDiscount = (value) => {
    this.setState({ discount: value });
  };

  calculateSubTotal = (cart) => {
    let subTotal = cart.reduce((accumulator, current) => {
      return Number(accumulator) + Number(current.subTotal);
    }, 0);

    this.setState({ subTotal: subTotal.toFixed(2) });
  };

  calculateQuantity = (cart) => {
    let totalQuantity = cart.reduce((accumulator, current) => {
      return Number(accumulator) + Number(current.quantity);
    }, 0);
    this.setState({ totalQuantity });
  };

  render() {
    const { products, cart, totalQuantity, discount, VAT, subTotal, total } =
      this.state;
    return (
      <CartContext.Provider
        value={{
          products: products,
          cart: cart,
          quantity: totalQuantity,
          subTotal: subTotal,
          discount: discount,
          VAT: VAT,
          total: total,
          setCart: this.setCart,
          increment: this.setQuantityIncrement,
          decrement: this.setQuantityDecrement,
          delete: this.deleteCartItem,
          empty: this.emptyCart,
          changeVAT: this.onChangeVAT,
          changeDiscount: this.onChangeDiscount,
        }}
      >
        <div className="row margin padding">
          <div className="col">
            <Cart /> <br />
          </div>

          <div className="col">
            <Products />
          </div>
        </div>
      </CartContext.Provider>
    );
  }
}

export default MainScreen;
