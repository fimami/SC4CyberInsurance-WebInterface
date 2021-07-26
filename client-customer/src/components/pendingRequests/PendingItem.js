function PendingItem(props) {
  function clickPendingContract() {
    props.setSelectedPendingContract({
      companyName: props.companyName,
      jsonHash: props.jsonHash,
    });
    props.openPendingInfo();
  }

  return (
    <>
      <button style={{ padding: "15px" }} onClick={clickPendingContract}>
        <div>Company Name: {props.companyName}</div>
      </button>
    </>
  );
}

export default PendingItem;
