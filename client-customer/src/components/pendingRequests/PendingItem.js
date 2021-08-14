function PendingItem(props) {
  function clickPendingContract() {
    props.setSelectedPendingContract({
      companyName: props.companyName,
      jsonHash: props.jsonHash,
      status: props.status,
      premium: props.premium,
    });
    props.openPendingInfo();
  }

  return (
    <>
      <button
        style={{ padding: "15px", backgroundColor: "yellow" }}
        onClick={clickPendingContract}
      >
        <div>Company Name: {props.companyName}</div>
        <div>Status: {props.status}</div>
        {parseInt(props.premium) !== 0 && <div>Premium: {props.premium}</div>}
      </button>
    </>
  );
}

export default PendingItem;
