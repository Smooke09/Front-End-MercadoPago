import React, { useState, useEffect } from "react";
import "./modalFinishing.scss";
import Loading from "../Loading/Loading";
import db from "../../Api/database";

const ModalFinishing = ({ value, modalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState({});


  //fazendo api e enviando pro banco tudo certinho precisa so verificar se o status é aprovado ou nao
  
  
  /*   useEffect(() => {
    if (reload) setTimeout(() => {}, 6000);
  }, []);
 */
  const VerifyDataPayment = async () => {
    setLoading(true);
    /*  if (value.NumeroDoPagamento === undefined) {
      return (
        <>
          <h1>Erro ao gerar o pagamento</h1>
          <p>Por favor, tente novamente</p>
        </>
      );
    } */
    await db
      .database()
      .ref("pagamentos/" + value.NumeroDoPagamento)
      .on("value", (snapshot) => {
        console.log("trazendo o id do pagamento", snapshot.val());
      });
    console.log("stauts", status);
    setLoading(false);
  };

  return (
    <div className="modal-finishing">
      <div className="modal-finishing-content">
        <div className="modal-finishin-item">
          {loading ? (
            <Loading />
          ) : (
            <div className="modal-finishing-item">
              {VerifyDataPayment()}
              <h1>Compra realizada com sucesso</h1>
              <p>Seu pedido será entregue em até 3 dias úteis</p>
              <p>Status: {status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalFinishing;
