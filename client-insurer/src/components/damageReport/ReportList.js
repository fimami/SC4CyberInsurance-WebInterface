import ReportItem from "./ReportItem";

function ReportList(props) {
  if (!props.newDamageReports.length) {
    return <div>No Damage Claims</div>;
  }

  return (
    <div style={{ margin: "10px" }}>
      {props.selectedList.map((report, i) => (
        <div key={i}>
          <ReportItem
            contractHash={props.selectedList[i].contractHash}
            damageStatus={props.selectedList[i].status}
            damageDate={props.selectedList[i].date}
            attackType={props.selectedList[i].attackType}
            amount={props.selectedList[i].amount}
            damageId={props.selectedList[i].id}
            logfileHash={props.selectedList[i].logfileHash}
            declineReason={props.selectedList[i].declineReason}
            counteroffer={props.selectedList[i].counteroffer}
            setShowDamageIsSelected={props.setShowDamageIsSelected}
            showDamageIsSelected={props.showDamageIsSelected}
            openReportOverview={props.openReportOverview}
            setSelectedReport={props.setSelectedReport}
            selectedReport={props.selectedReport}
          />
        </div>
      ))}
    </div>
  );
}

export default ReportList;
