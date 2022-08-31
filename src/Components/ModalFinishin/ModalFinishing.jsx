import React, { useState, useEffect } from "react";
import "./modalFinishing.scss";
import Loading from "../Loading/Loading";

import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3333");

const ModalFinishing = ({ value, modalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [aproved, setAproved] = useState(false);
  const [payment, setPayment] = useState({});

  // renderizando dados do webSocket e atualizando o status
  useEffect(() => {
    socket.on("payment", (data) => {
      setPayment(data);
    });
  }, [payment]);

  // Validando de o status é aprovado ou nao e se o usuario ja fez o pagamento
  function verifyPayment() {
    let intervalPayment = setInterval(() => {
      if (payment.state) {
        switch (payment.state) {
          case "FINISHED":
            if (payment.payment.state === "approved") {
              console.log("aproved");
            } else {
              console.log("not aproved");
              alert("Ocorreu um erro no seu pagamento tente novamente");
              axios.delete(
                `http://localhost:3333/cancelTransaction/${payment.id}`
              );
            }
            clearInterval(intervalPayment);
            break;
          case "CANCELED":
            console.log("cancelado");
            alert("Pagamento cancelado tente novamente");
            clearInterval(intervalPayment);
            break;

          default:
            break;
        }
        clearInterval(intervalPayment);
        setLoading(false);
        setAproved(true);
      } else {
        console.log("vazio");
        setAproved(false);
        clearInterval(intervalPayment);
      }
    }, 3000);

    aproved ? clearInterval(intervalPayment) : null;
  }

  // fechando o modal e limpando o estado do pagamento
  function finishiBuy() {
    setPayment({});
    location.reload();
  }

  // Inserindo mensagens de error para o usuario
  function toogleText() {
    if (payment.payment.state == "approved") {
      return "Compra aprovada";
    } else if (!payment.payment.state == "approved") {
      return "Algo deu errado realize novamente a compra caso na maquininha nao tenha aparecido nada, Click 2x no verde e selecione a opção cancelar";
    } else {
      return "Pagamento cancelado ";
    }
  }

  //modal open cancelar o pagamento usando axios (FAZER)

  return (
    <div className="modal-finishing">
      <h1>Finalização do pagamento</h1>
      {aproved ? (
        <div className="modal-finishing-content">
          {toogleText()}
          <div className="modal-finishing-buttons">
            <button
              className="modal-finishing-button-cancel"
              onClick={() => finishiBuy()}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        <div className="modal-finishing-content">
          <h1>Finalizando pagamento</h1>
          <p>
            Na maquininha Clique 2x no Botão verde e insira ou aproxime seu
            cartao, e Aguarde enquanto finalizamos o pagamento, caso o pagamento
            não seja finalizado em alguns segundos.
          </p>
          <div className="modal-finishing-buttons">
            <button
              className="modal-finishing-button-cancel"
              onClick={() => modalOpen()}
            >
              Cancelar
            </button>
            <div className="loading">
              <Loading />
            </div>
          </div>
        </div>
      )}
      {verifyPayment()}
    </div>
  );
};

export default ModalFinishing;
