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
      damageDate: props.damageDate,
      attackType: props.attackType,
      amount: props.amount,
      logfileHash: props.logfileHash,
      id: props.damageId,
      // logfileContent: logfileContent,
    });
  }
  if (props.proposalHashList.includes(props.contractHash)) {
    return null;
  } else {
    return (
      <>
        <button
          onClick={openReportSelectHash}
          style={{ padding: "10px", marginBottom: "10px", textAlign: "left" }}
        >
          <div>Company: {props.companyName}</div>
          <div>Amount (EUR): {props.amount}</div>
          <div>ID: {props.damageId}</div>
          <div>Status: New</div>
        </button>
        <br />
        <br />
      </>
    );
  }
}

export default ReportItem;
