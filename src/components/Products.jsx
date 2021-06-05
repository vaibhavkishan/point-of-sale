import React, { useState, useContext } from 'react';
import CartContext from './cartContext';

function Products(props) {
  const [isHovered, setIsHovered] = useState(false);
  const value = useContext(CartContext);

  return (
    <div
      className="wrapper"
      style={{
        backgroundColor: 'gainsboro',
        width: '764px',
      }}
    >
      {value.products.map((p) => (
        <div
          key={'a' + p.name}
          className="wrapper"
          style={{ backgroundColor: 'gainsboro' }}
        >
          <img
            className="clickable"
            alt=""
            width="90"
            height="90"
            src={p.image && require(`../services/images/${p.image}`).default}
            style={{ borderRadius: 10 }}
          />
          <div
            className="clickable"
            style={{
              transform: `translate(${-120}px, ${0}px)`,
              width: 90,
              height: 90,
              fontWeight: 'bold',
              opacity: 0.5,
              fontSize: 11,
              color: 'black',
              backgroundColor: '#8B8B8B',
              borderRadius: 10,
            }}
            onMouseOver={() => {
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setIsHovered(false);
            }}
            onClick={() => {
              const obj = {
                name: p.name,
                price: p.price,
                description: p.description,
                quantity: 1,
              };
              value.setCart(obj);
            }}
          >
            <p style={{ transform: `translate(${10}px, ${0}px)`, opacity: 1 }}>
              {p.name.toUpperCase()}
            </p>
            <p
              style={{
                transform: `translate(${25}px, ${-10}px)`,
                opacity: 1,
              }}
            >
              {isHovered && p.price + ' EUR'}
            </p>
            <p
              style={{
                transform: `translate(${2}px, ${-15}px)`,
                fontSize: 8,
                width: 100,
              }}
            >
              {isHovered && p.description.toUpperCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
