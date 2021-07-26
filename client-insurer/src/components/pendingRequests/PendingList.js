import PendingItem from "./PendingItem";

function PendingList(props) {
  return (
    <div style={{ margin: "10px" }}>
      {props.pendingContracts.map((contract, i) => (
        <div key={i}>
          <PendingItem
            companyName={props.pendingContracts[i].companyName}
            jsonHash={props.pendingContracts[i].jsonHash}
            status={props.pendingContracts[i].status}
            premium={props.pendingContracts[i].premium}
            openPendingInfo={props.openPendingInfo}
            setSelectedPendingContract={props.setSelectedPendingContract}
          />
        </div>
      ))}
    </div>
  );
}

export default PendingList;
