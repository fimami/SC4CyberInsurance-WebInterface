import { Card } from "@material-ui/core";
import InputCIForm from "../contractCreation/InputCIForm";
import ContractOverview from "../informationOverview/ContractOverview";
import ReportForm from "../damageReport/ReportForm";
import ReportOverview from "../damageReport/ReportOverview";
import UpdateOverview from "../informationOverview/UpdateOverview";
import PendingOverview from "../pendingRequests/PendingOverview";

function ActionWindow(props) {
  function clickReportDamage() {
    props.setShowReportForm(true);
    props.setShowContractInfo(!props.showContractInfo);
  }

  //close Form button on Report Form
  function closeReportForm() {
    props.setShowReportForm(false);
    props.setShowContractInfo(!props.showContractInfo);
  }

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
        {!props.isFormOpen && props.showFormButton && (
          <button onClick={props.openForm}>Open Contract Form</button>
        )}
        {props.isFormOpen && (
          <div>
            <button onClick={props.closeForm}>Close Form</button> <br />
            <br />
            <InputCIForm />
          </div>
        )}
        {props.showContractInfo &&
          !props.showFormButton &&
          !props.showUpdateContent && (
            <div>
              <ContractOverview
                availableContracts={props.availableContracts}
                setShowReportForm={props.setShowReportForm}
                clickReportDamage={clickReportDamage}
                closeInfoOrReport={props.closeInfoOrReport}
                selectedContract={props.selectedContract}
              />
            </div>
          )}
        {!props.showContractInfo &&
          !props.showFormButton &&
          props.showUpdateContent && (
            <UpdateOverview
              selectedContract={props.selectedContract}
              closeInfoOrReport={props.closeInfoOrReport}
            />
          )}
        {!props.showContractInfo && props.showReportForm && (
          <ReportForm closeReportForm={closeReportForm} />
        )}
        {props.showDamageReport &&
          Array.isArray(props.availableContracts) &&
          props.availableContracts.length && (
            <div>
              <ReportOverview
                availableContracts={props.availableContracts}
                closeInfoOrReport={props.closeInfoOrReport}
                selectedReport={props.selectedReport}
              />
            </div>
          )}
        {props.showPendingInfo && (
          <PendingOverview
            selectedPendingContract={props.selectedPendingContract}
            closeInfoOrReport={props.closeInfoOrReport}
          />
        )}
      </Card>
    </div>
  );
}

export default ActionWindow;
