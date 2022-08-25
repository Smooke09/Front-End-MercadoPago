import React, { useState } from "react";
import "./App.scss";
import connection from "./Api/connection";
import Modal from "./Components/Modal/Modal.jsx";

const App = () => {
  const [product, setProduct] = useState({
    description: "",
    price: "",
    paymentType: "",
  });
  const [modal, setModal] = useState(false);

  const handleClick = (value) => {
    setProduct({
      ...product,
      description: value.description,
      price: value.price,
    });
    setModal(true);
    return;
  };

  return (
    <div className="container">
      <h1>Catalago de Produtos</h1>
      <div className="container-card">
        <div className="card card1">
          <img
            src="https://www.sabornamesa.com.br/media/k2/items/cache/75505b88ea9e360c587f56225dfdb627_XL.jpg"
            alt=""
            className="card-img-top"
          />
          <h1>Pao de quiejo</h1>
          <p>
            Preco <br />
            <span>R$ 1,00</span>
          </p>
          <button
            onClick={() =>
              handleClick({
                description: "Pao de quiejo",
                price: "1.00",
              })
            }
          >
            Comprar
          </button>
          {modal ? (
            <Modal value={product} modalOpen={() => setModal()} />
          ) : null}
        </div>
        <div className="card card2">
          <img
            src="https://s24937.pcdn.co/wp-content/uploads/2016/04/X%C3%ADcara-de-caf%C3%A9-unsplash.jpg"
            alt=""
            className="card-img-top"
          />
          <h1>Cafe</h1>
          <p>
            Preco <br />
            <span>R$ 1,00</span>
          </p>
          <button
            onClick={() =>
              handleClick({
                price: "1.00",
                name: "Cafe",
              })
            }
          >
            Comprar
          </button>
        </div>
        <div className="card card3">
          <img
            src="https://cdn.shopify.com/s/files/1/2534/7488/articles/beneficios-da-agua_600x.jpg?v=1613680046"
            alt=""
            className="card-img-top"
          />
          <h1>Agua</h1>
          <p>
            Preco <br />
            <span>R$ 1,00</span>
          </p>
          <button
            onClick={() =>
              handleClick({
                price: "1.00",
                name: "Agua",
              })
            }
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
