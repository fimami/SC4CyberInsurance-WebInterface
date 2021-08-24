function ReportItem(props) {
  function openReportSelectHash() {
    props.openReportOverview();
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

  if (props.proposalHashList.includes(props.contractHash)) {
    return null;
  } else {
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
          <div>Company: {props.companyName}</div>
          <div>Amount (EUR): {props.amount}</div>
          <div>ID: {props.damageId}</div>
          <div>Status: {getStatus()}</div>
        </button>
        <br />
        <br />
      </>
    );
  }
}

export default ReportItem;
