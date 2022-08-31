import React, { useState, useEffect } from "react";
import "./modalFinishing.scss";
import Loading from "../Loading/Loading";
import db from "../../Api/database";

import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3333");

const ModalFinishing = ({ value, modalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState({});
  const [aproved, setAproved] = useState(false);
  const [payment, setPayment] = useState({});

  //fazendo api e enviando pro banco tudo certinho precisa so verificar se o status é aprovado ou nao

  useEffect(() => {
    socket.on("payment", (data) => {
      setPayment(data);
    });
  }, [payment]);

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

  function finishiBuy() {
    setPayment({});
    location.reload();
  }

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

/* 
{aproved ? (
  <div className="modal-finishing-content">
    <h1>Pagamento Aprovado</h1>
    <p>
      Seu pagamento foi aprovado seu comprovante sera impresso! Obrigado
      pela preferencia
    </p>
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
      Aguarde enquanto finalizamos o pagamento, caso o pagamento não seja
      finalizado em 30 segundos, clique em cancelar.e refaça o pagamento
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
)} */
