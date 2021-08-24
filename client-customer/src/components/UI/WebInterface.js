import axios from "axios";
import { useEffect, useState } from "react";
import ActionWindow from "./ActionWindow";
import ActiveContracts from "./ActiveContracts";
import LoginScreen from "./LoginScreen";
import PendingContracts from "./PendingContracts";
import ReportedDamages from "./ReportedDamages";

function WebInterface() {
  //sets if the contract information is shown
  const [showContractInfo, setShowContractInfo] = useState(false);

  const [showUpdateContent, setShowUpdateContent] = useState(false);

  const [showPendingInfo, setShowPendingInfo] = useState(false);

  const [availableContracts, setAvailableContracts] = useState([]);

  const [pendingContracts, setPendingContracts] = useState([]);

  const [newDamageReports, setNewDamageReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});

  const [selectedContract, setSelectedContract] = useState({});

  const [proposalHashList, setProposalHashList] = useState([]);

  const [addressConfiguration, setAddressConfiguration] = useState(false);
  const [accAddr, setAccAddr] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  //triggers the visibility of the Open Form Button
  const [showFormButton, setShowFormButton] = useState(true);

  const [showDamageReport, setShowDamageReport] = useState(false);

  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const [selectedPendingContract, setSelectedPendingContract] = useState({});

  //triggers the report form window (show, not show)
  const [showReportForm, setShowReportForm] = useState(false);

  const url = "http://127.0.0.1:5001";

  const getAvailableContracts = () => {
    axios
      .get(`${url}/getAvailableContracts`)
      .then((response) => {
        console.log(response);
        if (response.data.length) {
          setAvailableContracts(response.data);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getPendingContracts = () => {
    axios
      .get(`${url}/getPendingContracts`)
      .then((res) => {
        console.log(res);
        setPendingContracts(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getAllDamages = () => {
    let reportlist = [];
    if (availableContracts.length) {
      axios
        .get(`${url}/getAllDamages`)
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data)) {
            res.data.map((report, i) => {
              if (!proposalHashList.includes(res.data[i].contractHash)) {
                reportlist.push(res.data[i]);
              }
              return true;
            });
          }
          setNewDamageReports(reportlist);
        })
        .catch((error) => console.error(`Error: ${error}`));
    } else {
      setNewDamageReports([]);
    }
  };

  const checkForNewProposal = () => {
    axios
      .get(`${url}/checkForNewProposal`)
      .then((res) => {
        console.log(res.data);
        setProposalHashList(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    setInterval(() => {
      getAvailableContracts();
      getPendingContracts();
    }, 10000);
  }, []);

  useEffect(() => {
    if (availableContracts.length && Array.isArray(availableContracts)) {
      getAllDamages();
      checkForNewProposal();
    }
  }, [availableContracts]);

  function closeForm() {
    setIsFormOpen(false);
  }

  function openForm() {
    if (availableContracts.length) {
      alert("There can be one contract at max. Please contact the insurer.");
      return;
    }
    setIsFormOpen(true);
  }

  function openUpdateContent() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowReportForm(false);
    setShowUpdateContent(true);
    setShowPendingInfo(false);
  }

  function openReportOverview() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowDamageReport(true);
    setShowFormButton(false);
    setShowReportForm(false);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function openContractInfo() {
    setShowContractInfo(true);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(false);
  }

  function closeInfoOrReport() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(true);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(false);
  }

  function openPendingInfo() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(true);
  }

  return (
    <>
      {addressConfiguration === false ? (
        <LoginScreen
          setAddressConfiguration={setAddressConfiguration}
          setAccAddr={setAccAddr}
        />
      ) : (
        <>
          <ReportedDamages
            availableContracts={availableContracts}
            newDamageReports={newDamageReports}
            openReportOverview={openReportOverview}
            setSelectedReport={setSelectedReport}
            proposalHashList={proposalHashList}
          />
          <ActionWindow
            availableContracts={availableContracts}
            showContractInfo={showContractInfo}
            setShowContractInfo={setShowContractInfo}
            closeForm={closeForm}
            openForm={openForm}
            isFormOpen={isFormOpen}
            showFormButton={showFormButton}
            showDamageReport={showDamageReport}
            setShowDamageReport={setShowDamageReport}
            showReportForm={showReportForm}
            setShowReportForm={setShowReportForm}
            showCounterOffer={showCounterOffer}
            closeInfoOrReport={closeInfoOrReport}
            newDamageReports={newDamageReports}
            selectedReport={selectedReport}
            selectedContract={selectedContract}
            showUpdateContent={showUpdateContent}
            showPendingInfo={showPendingInfo}
            selectedPendingContract={selectedPendingContract}
            accAddr={accAddr}
          />
          <ActiveContracts
            availableContracts={availableContracts}
            openContractInfo={openContractInfo}
            setSelectedContract={setSelectedContract}
            setProposalHashList={setProposalHashList}
            proposalHashList={proposalHashList}
            openUpdateContent={openUpdateContent}
          />
          <PendingContracts
            pendingContracts={pendingContracts}
            openPendingInfo={openPendingInfo}
            setSelectedPendingContract={setSelectedPendingContract}
          />
        </>
      )}
    </>
  );
}

export default WebInterface;
