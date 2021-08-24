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
            openContractInfo={props.openContractInfo}
            setSelectedContract={props.setSelectedContract}
            setProposalHashList={props.setProposalHashList}
            proposalHashList={props.proposalHashList}
            openUpdateContent={props.openUpdateContent}
          />
        </div>
      ))}
    </div>
  );
}

export default ContractList;
