import { Card } from "@material-ui/core";
// import InputCIForm from "../contractCreation/InputCIForm";
import ReportOverview from "../damageReport/ReportOverview";
import ContractInformationOverview from "../informationOverview/ContractInformationOverview";
import PendingOverview from "../pendingRequests/PendingOverview";

function ActionWindow(props) {
  // function clickReportDamage() {
  //   props.setShowReportForm(true);
  //   props.setShowContractInfo(!props.showContractInfo);
  // }

  //close Form button on Report Form;
  // function closeReportForm() {
  //   props.setShowReportForm(false);
  //   props.setShowContractInfo(!props.showContractInfo);
  // }

  return (
    <div className="active-window">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "90vh",
        }}
      >
        <h2>Action Window (Address: {props.accAddr})</h2>
        {/* <span>Address: {props.accAddr}</span> */}
        {/* {!props.isFormOpen && props.showFormButton && (
          <button onClick={props.openForm}>Open Contract Form</button>
        )} */}
        {/* {props.isFormOpen && (
          <div>
            <button onClick={props.closeForm}>Close Form</button> <br />
            <br />
            <InputCIForm />
          </div>
        )} */}
        {props.showContractInfo && (
          <div>
            <ContractInformationOverview
              setAvailableContracts={props.setAvailableContracts}
              // existingContractInfo={props.existingContractInfo}
              // setExistingContractInfo={props.setExistingContractInfo}
              // changeOverview={props.changeOverview}
              availableContracts={props.availableContracts}
              // useContractHash={props.useContractHash}
              // clickReportDamage={clickReportDamage}
              closeInfoOrReport={props.closeInfoOrReport}
              selectedContract={props.selectedContract}
              selectedUpdateHash={props.selectedUpdateHash}
              proposalHashList={props.proposalHashList}
            />
          </div>
        )}
        {props.showDamageReport && (
          <div>
            <ReportOverview
              availableContracts={props.availableContracts}
              closeInfoOrReport={props.closeInfoOrReport}
              selectedReport={props.selectedReport}
              setSelectedReport={props.setSelectedReport}
            />
          </div>
        )}
        {props.showPendingInfo && (
          <PendingOverview
            selectedPendingContract={props.selectedPendingContract}
            closeInfoOrReport={props.closeInfoOrReport}
            setSelectedPendingContract={props.setSelectedPendingContract}
          />
        )}
        {!props.showPendingInfo &&
          !props.showDamageReport &&
          !props.showContractInfo && <div>Select a claim or contract.</div>}
      </Card>
    </div>
  );
}

export default ActionWindow;
