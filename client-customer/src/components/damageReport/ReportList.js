import { useState } from "react";
import ReportItem from "./ReportItem";

function ReportList(props) {
  // const [useReportMessage, setUseReportMessage] = useState("");

  if (!props.newDamageReports.length) {
    return null;
  }

  return (
    <div style={{ margin: "10px" }}>
      {props.newDamageReports.map((report, i) => (
        <div key={i}>
          <ReportItem
            contractHash={props.newDamageReports[i].contractHash}
            damageDate={props.newDamageReports[i].date}
            attackType={props.newDamageReports[i].attackType}
            amount={props.newDamageReports[i].amount}
            damageId={props.newDamageReports[i].id}
            logfileHash={props.newDamageReports[i].logfileHash}
            setShowDamageIsSelected={props.setShowDamageIsSelected}
            showDamageIsSelected={props.showDamageIsSelected}
            companyName={props.availableContracts[0].companyName}
            jsonHash={props.availableContracts[0].jsonHash}
            // useReportMessage={useReportMessage}
            openReportOverview={props.openReportOverview}
            setSelectedReport={props.setSelectedReport}
            proposalHashList={props.proposalHashList}
          />
        </div>
      ))}
    </div>
  );
}

export default ReportList;
