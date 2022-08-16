import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
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
            <span>$ 23,50</span>
          </p>
          <button>Comprar</button>
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
            <span>$ 23,50</span>
          </p>
          <button>Comprar</button>
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
            <span>$ 23,50</span>
          </p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
