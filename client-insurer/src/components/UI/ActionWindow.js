import { Card } from "@material-ui/core";
// import InputCIForm from "../contractCreation/InputCIForm";
import ReportForm from "../damageReport/ReportForm";
import ReportOverview from "../damageReport/ReportOverview";
import ContractInformationOverview from "../informationOverview/ContractInformationOverview";

function ActionWindow(props) {
  function clickReportDamage() {
    props.setShowReportForm(true);
    props.setShowContractInfo(!props.showContractInfo);
  }

  //close Form button on Report Form;
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
        <h2>Action Window</h2>
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
              // existingContractInfo={props.existingContractInfo}
              // setExistingContractInfo={props.setExistingContractInfo}
              // changeOverview={props.changeOverview}
              availableContracts={props.availableContracts}
              // useContractHash={props.useContractHash}
              setShowReportForm={props.setShowReportForm}
              clickReportDamage={clickReportDamage}
              closeInfoOrReport={props.closeInfoOrReport}
              selectedContract={props.selectedContract}
              selectedUpdateHash={props.selectedUpdateHash}
            />
          </div>
        )}
        {!props.showContractInfo && props.showReportForm && (
          <ReportForm closeReportForm={closeReportForm} />
        )}
        {props.showDamageReport && (
          <div>
            <ReportOverview
              // availableContracts={props.availableContracts}
              closeInfoOrReport={props.closeInfoOrReport}
              selectedReport={props.selectedReport}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default ActionWindow;
