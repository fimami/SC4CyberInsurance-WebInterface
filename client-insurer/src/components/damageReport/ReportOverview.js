import axios from "axios";
import { useEffect, useState } from "react";

function ReportOverview(props) {
  const [logfileContent, setLogfileContent] = useState("");
  const [counterofferAmount, setCounterofferAmount] = useState(0);
  const [declineReason, setDeclineReason] = useState("");

  const url = "http://127.0.0.1:5000";

  const getLogfileContent = () => {
    const logfileHash = JSON.stringify(props.selectedReport.logfileHash);
    console.log(logfileHash);

    axios
      .post(`${url}/getLogFileContent2`, logfileHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLogfileContent(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const acceptDamage = (e) => {
    const idAndAmount = JSON.stringify({
      id: props.selectedReport.id,
      amount: props.selectedReport.amount,
    });
    console.log(idAndAmount);
  };

  const sendCounteroffer = (e) => {
    const idAmountAndReason = JSON.stringify({
      id: props.selectedReport.id,
      reason: declineReason,
      amount: counterofferAmount,
    });
    console.log(idAmountAndReason);
  };

  const declineDamage = (e) => {
    const idAmountAndReason = JSON.stringify({
      id: props.selectedReport.id,
      reason: declineReason,
      amount: 0,
    });
    console.log(idAmountAndReason);
  };

  function handleCounterofferAmount(e) {
    setCounterofferAmount(e.target.value);
  }

  function handleDeclineReason(e) {
    setDeclineReason(e.target.value);
  }

  function closeReport() {
    props.closeInfoOrReport();
    props.setSelectedReport({});
  }

  useEffect(() => {
    getLogfileContent();
  }, []);

  return (
    <div>
      <button style={{ marginBottom: "15px" }} onClick={closeReport}>
        Close Report Overview
      </button>
      <br />
      <div>Contract Hash: {props.selectedReport.contractHash}</div>
      <br />
      <br />
      <div>Date: {props.selectedReport.damageDate}</div>
      <br />
      <div>Attack Type: {props.selectedReport.attackType}</div>
      <br />
      <div>Amount to cover: {props.selectedReport.amount}</div>
      <br />
      <div style={{ float: "left" }}>
        <div
          style={{
            height: "30vh",
            margin: "5px",
            overflowY: "scroll",
            borderStyle: "solid",
            padding: "5px",
            width: "25vw",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Logfile Content: </div>
          <br />
          <div>{logfileContent}</div>
        </div>
        <div>STATUS: Pending...</div>
      </div>

      <div style={{ float: "right" }}>
        <button
          onClick={acceptDamage}
          style={{ padding: "10px", backgroundColor: "lightgreen" }}
        >
          Accept Damage: {props.selectedReport.amount}
        </button>
        <br />
        <hr />
        <div>Counteroffer Amount:</div>
        <input
          onChange={handleCounterofferAmount}
          type="number"
          value={counterofferAmount}
        />
        <br />
        <br />
        <div>Counteroffer/Rejection Reason:</div>
        <textarea
          onChange={handleDeclineReason}
          style={{ height: "20vh", width: "25vw" }}
        />
        <br />
        <button onClick={sendCounteroffer}>
          Send Counteroffer: {counterofferAmount}
        </button>
        <br />
        <br />
        <button onClick={declineDamage}>
          Decline Damage Claim (no counteroffer)
        </button>
      </div>
      <br />
    </div>
  );
}

export default ReportOverview;
