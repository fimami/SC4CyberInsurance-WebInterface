import { Card } from "@material-ui/core";
import ReportOverview from "../damageReport/ReportOverview";
import ContractInformationOverview from "../informationOverview/ContractInformationOverview";
import PendingOverview from "../pendingRequests/PendingOverview";

function ActionWindow(props) {
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
        {props.showContractInfo && (
          <div>
            <ContractInformationOverview
              setAvailableContracts={props.setAvailableContracts}
              availableContracts={props.availableContracts}
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
