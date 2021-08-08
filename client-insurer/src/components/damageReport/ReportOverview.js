import axios from "axios";
import { useEffect, useState } from "react";

function ReportOverview(props) {
  const [logfileContent, setLogfileContent] = useState("");
  const [counterofferAmount, setCounterofferAmount] = useState(0);
  const [declineReason, setDeclineReason] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);

  const url = "http://127.0.0.1:5000";

  const getLogfileContentAndHash = () => {
    const logfileHash = JSON.stringify(props.selectedReport.logfileHash);
    // console.log(logfileHash);
    const jsonHash = JSON.stringify(props.selectedReport.contractHash);

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

    axios
      .post(`${url}/useContract2`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => console.error(`Error: ${error}`));

    axios
      .get(`${url}/getExchangeRate`)
      .then((res) => {
        // console.log(res);
        setExchangeRate(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const acceptDamage = (e) => {
    const idAndAmount = JSON.stringify({
      id: props.selectedReport.id,
      amount: props.selectedReport.amount,
    });
    // console.log(idAndAmount);

    axios
      .post(`${url}/acceptDamage2`, idAndAmount, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        alert(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const sendCounterofferOrDecline = (e) => {
    const idAmountAndReason = JSON.stringify({
      id: props.selectedReport.id,
      reason: declineReason,
      amount: counterofferAmount,
    });
    // console.log(idAmountAndReason);

    axios
      .post(`${url}/declineDamage2`, idAmountAndReason, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        alert(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // const declineDamage = (e) => {
  //   const idAmountAndReason = JSON.stringify({
  //     id: props.selectedReport.id,
  //     reason: declineReason,
  //     amount: 0,
  //   });
  //   console.log(idAmountAndReason);
  // };

  // const useContract = () => {
  //   const jsonHash = JSON.stringify(props.selectedReport.contractHash);

  //   axios
  //     .post(`${url}/useContract2`, jsonHash, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

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

  function getStatus() {
    switch (props.selectedReport.damageStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Paid";
      case 2:
        return "Under Investigation";
      case 3:
        return "Dispute";
      case 4:
        return "Resolved";
      case 5:
        return "Cancelled";
      default:
        break;
    }
  }

  useEffect(() => {
    // useContract();
    getLogfileContentAndHash();
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
            height: "40vh",
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
        <div>STATUS: {getStatus()}</div>
      </div>
      {getStatus() === "Pending" && (
        <div style={{ float: "right" }}>
          <button
            onClick={acceptDamage}
            style={{ padding: "10px", backgroundColor: "lightgreen" }}
          >
            Accept Damage: {props.selectedReport.amount}
          </button>
          <br />
          <hr />
          <div>Counteroffer Amount (EUR):</div>
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
          <button onClick={sendCounterofferOrDecline}>
            Send Counteroffer (0 will send no counteroffer):{" "}
            {counterofferAmount}
          </button>
          <br />
          <br />
        </div>
      )}
      {getStatus() === "Paid" && (
        <div style={{ float: "right" }}>
          {parseInt(props.selectedReport.counteroffer) !== 0 ? (
            <div>
              The claim has been paid with the counteroffer:{" "}.
              {props.selectedReport.counteroffer}
            </div>
          ) : (
            <div>
              The claim has been paid with {props.selectedReport.amount}.
            </div>
          )}
        </div>
      )}
      {getStatus() === "Under Investigation" && (
        <div
          style={{
            float: "right",
            height: "40vh",
            margin: "5px",
            overflowY: "scroll",
            borderStyle: "solid",
            borderColor: "red",
            padding: "5px",
            width: "28vw",
          }}
        >
          <div>
            The claim was declined with a counteroffer of:{" "}
            {parseInt(props.selectedReport.counteroffer)}
          </div>
          <br />
          <br />
          <div>
            The reason for declining was: {props.selectedReport.declineReason}
          </div>
          <br />
          <br />
          <div>Waiting for the customer to process the counteroffer...</div>
        </div>
      )}
      {getStatus() === "Dispute" && (
        <div
          style={{
            float: "right",
            height: "40vh",
            margin: "5px",
            overflowY: "scroll",
            borderStyle: "solid",
            borderColor: "red",
            padding: "5px",
            width: "28vw",
          }}
        >
          <div>
            The claim with a counteroffer of{" "}
            {parseInt(props.selectedReport.counteroffer)} was declined by the
            customer.
          </div>
          <br />
          <br />
          <div>It is possible to send another counteroffer:</div>
          <br />
          <br />
          <div>Counteroffer Amount (EUR):</div>
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
          <button onClick={sendCounterofferOrDecline}>
            Send Counteroffer: {counterofferAmount}
          </button>
        </div>
      )}
      {getStatus() === "Resolved" && (
        <div style={{ float: "right" }}>
          <div>The dispute was resolved externally.</div>
        </div>
      )}
      <br />
    </div>
  );
}

export default ReportOverview;
