import ListItem from "./ListItem";

function ContractList(props) {
  return (
    <div style={{ margin: "10px" }}>
      {props.availableContracts.map((contract, i) => (
        <div key={i}>
          <ListItem
            companyName={props.availableContracts[i].companyName}
            jsonHash={props.availableContracts[i].jsonHash}
            contractAddress={props.availableContracts[i].contractAddress}
            updated={props.availableContracts[i].updated}
            openContractInfo={props.openContractInfo}
            setSelectedContract={props.setSelectedContract}
            selectedContract={props.selectedContract}
            setSelectedUpdateHash={props.setSelectedUpdateHash}
            selectedReport={props.selectedReport}
          />
        </div>
      ))}
    </div>
  );
}

export default ContractList;
