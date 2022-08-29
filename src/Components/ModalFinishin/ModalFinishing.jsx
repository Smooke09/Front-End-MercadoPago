import React, { useState, useEffect } from "react";
import "./modalFinishing.scss";
import Loading from "../Loading/Loading";
import db from "../../Api/database";


const ModalFinishing = ({ value, modalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState({});

  //fazendo api e enviando pro banco tudo certinho precisa so verificar se o status é aprovado ou nao

  /*   useEffect(() => {
    if (reload) setTimeout(() => {}, 6000);
  }, []);
 */

  const VerifyDataPayment = () => {











 /*    if (value.NumeroDoPagamento === "") {
      return;
    }

    if (status.id === value.NumeroDoPagamento && status.state == "approved") {
      console.log("pagamento aprovado");
      return;
    } else if (
      status.id === value.NumeroDoPagamento &&
      status.state == "CANCELED"
    ) {
      console.log("pagamento cancelado");
      return;
    } else {
      console.log("pagamento pendente");
      setTimeout(() => {
        db.database()
          .ref("pagamentos/" + value.NumeroDoPagamento)
          .on("value", (snapshot) => {
            console.log("trazendo o id do pagamento", snapshot.val());
            setStatus(snapshot.val());
            console.log("status", status);
          });
        setLoading(false);
      }, 6000);
    } */
  };

  return (
    <div className="modal-finishing">
      <div className="modal-finishing-content">
        <div className="modal-finishin-item">
          {loading ? (
            <Loading />
          ) : (
            <div className="modal-finishing-item">{VerifyDataPayment()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalFinishing;
