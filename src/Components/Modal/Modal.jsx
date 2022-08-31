import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import connection from "../../Api/connection";
import ModalFinishing from "../ModalFinishin/ModalFinishing";

import "./Modal.scss";

const Modal = ({ value, modalOpen }) => {
  const [product, setProduct] = useState({
    description: value.description,
    price: value.price,
    paymentType: value.paymentType,
    print_on_terminal: false,
  });
  const [loading, setLoading] = useState(false);
  const [modalFinishing, setModalFinishing] = useState(false);
  const [resData, setResData] = useState({});

  //Validando se o usuario selecionou pix ou cartão
  if (product.paymentType === "pix") {
    let paymentPix = document.querySelector(".alert-payment");
    paymentPix.style.display = "block";
  }
  if (
    product.paymentType === "credit_card" ||
    product.paymentType === "debit_card"
  ) {
    let paymentPix = document.querySelector(".alert-payment");
    paymentPix.style.display = "none";
  }

  const handleChange = async (e) => {
    //Convertendo o valor do produto de sentavos para Valor que API aceita
    const convertPrice = product.price.toString();
    const convertPrice2 = convertPrice.replace(/\./g, "");
    const convertPrice3 = parseInt(convertPrice2);

    const body = {
      amount: convertPrice3,
      description: product.description,
      payment: {
        type: product.paymentType,
      },
      additional_info: {
        external_reference: "opfr6sJwVm4OsX8yGo2sntHqPMLni1O9",
        print_on_terminal: product.print_on_terminal,
      },
    };

    //Validando se o usuario selecionou pix e inserir um alert na tela para o usuario
    if (product.paymentType === "pix") {
      return alert("Pix não é um tipo de pagamento disponível no momento");
    }

    // Fazendo a requisição para a api
    await connection
      .post("/createTransaction", body)
      .then((res) => {
        console.log("res data", res.data);
        setResData(res.data);
        setModalFinishing(true);

        return;
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        return;
      });
  };

  //Função para fechar o modal
  const modalClose = () => {
    modalOpen(false);
    console.log(product);
    console.log(modalOpen);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
    });
    setLoading(true);
    handleChange();
  };

  return (
    <div className="modal-container">
      <form onSubmit={handlePayment}>
        <div className="modal-content">
          <div className="quit" onClick={modalClose}>
            <h1 className="rotate-scale-up">X</h1>
            <br />
            <br />
          </div>
          <h2>Checkout</h2>
          <div className="modal-content-item">
            <div className="modal-content-label">
              <label>
                <span>Produto:</span> {value.description}
              </label>
              <label>
                <span>Total:</span> R$ {value.price}
                <p className="alert-payment">Pagamento por PIX indisponivel</p>
              </label>
              <select
                list="payments"
                id="payment"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    paymentType: e.target.value,
                  })
                }
              >
                <option value="debit_card">Cartão de Debito</option>
                <option value="credit_card">Cartão de Credito</option>
                <option value="pix">PIX</option>
              </select>
            </div>
            <div className="modal-content-checked">
              <div className="checkbox print">
                <input
                  type="checkbox"
                  id="print"
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      print_on_terminal: e.target.checked,
                    })
                  }
                />
                <label for="print">Imprimir na impressora</label>
              </div>
              <div className="checkbox email">
                <input type="checkbox" id="email" />
                <label for="email">Enviar por e-mail</label>
              </div>
              <div className="checkbox sms">
                <input type="checkbox" id="sms" />
                <label for="sms">Enviar por SMS</label>
              </div>
            </div>
          </div>
          <div className="modal-content-button">
            <button type="submit">Comprar</button>
          </div>
          {modalFinishing ? (
            <ModalFinishing
              value={resData}
              modalOpen={() => setModalFinishing(false)}
            />
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Modal;
