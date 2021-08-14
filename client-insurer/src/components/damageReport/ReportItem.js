function ReportItem(props) {
  // const [logfileContent, setLogfileContent] = useState("");

  // const getLogfileContent = () => {
  //   const logfileHash = JSON.stringify(props.logfileHash);

  //   const url = "http://127.0.0.1:5001";

  //   axios
  //     .post(`${url}/getLogfileContent`, logfileHash, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       setLogfileContent(response.data);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };
  function openReportSelectHash() {
    props.openReportOverview();
    // getLogfileContent();
    props.setSelectedReport({
      contractHash: props.contractHash,
      damageStatus: props.damageStatus,
      damageDate: props.damageDate,
      attackType: props.attackType,
      amount: props.amount,
      logfileHash: props.logfileHash,
      id: props.damageId,
      declineReason: props.declineReason,
      counteroffer: props.counteroffer,
      // logfileContent: logfileContent,
    });
  }

  function getStatus() {
    switch (props.damageStatus) {
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

  return (
    <>
      <button
        onClick={openReportSelectHash}
        style={{
          padding: "10px",
          marginBottom: "10px",
          textAlign: "left",
          backgroundColor: "yellow",
        }}
      >
        <div>Amount (EUR): {props.amount}</div>
        <div>ID: {props.damageId}</div>
        <div>Status: {getStatus()}</div>
      </button>
      <br />
      <br />
    </>
  );
}

export default ReportItem;
