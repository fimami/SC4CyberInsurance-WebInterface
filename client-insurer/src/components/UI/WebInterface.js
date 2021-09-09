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

  const [availableContracts, setAvailableContracts] = useState([]);

  const [showPendingInfo, setShowPendingInfo] = useState(false);

  const [pendingContracts, setPendingContracts] = useState([]);

  const [selectedPendingContract, setSelectedPendingContract] = useState({});

  const [newDamageReports, setNewDamageReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});

  const [selectedContract, setSelectedContract] = useState({});

  const [addressConfiguration, setAddressConfiguration] = useState(false);
  const [accAddr, setAccAddr] = useState("");

  const [selectedUpdateHash, setSelectedUpdateHash] = useState("");

  const [showDamageReport, setShowDamageReport] = useState(false);

  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const url = "http://127.0.0.1:5000";

  const getAvailableContracts = () => {
    axios
      .get(`${url}/getAvailableContracts`)
      .then((response) => {
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
        setPendingContracts(res.data);
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
    const getAllDamages = () => {
      if (availableContracts.length) {
        axios
          .get(`${url}/getAllDamages`)
          .then((res) => {
            if (Array.isArray(res.data)) {
              setNewDamageReports(res.data);
            }
          })
          .catch((error) => console.error(`Error: ${error}`));
      } else {
        setNewDamageReports([]);
      }
    };
    if (availableContracts.length && Array.isArray(availableContracts)) {
      getAllDamages();
    }
  }, [availableContracts]);

  function openReportOverview() {
    setShowContractInfo(false);
    setShowDamageReport(false);
    setShowDamageReport(true);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function openContractInfo() {
    setShowContractInfo(true);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function closeInfoOrReport() {
    setShowContractInfo(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function openPendingInfo() {
    setShowContractInfo(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
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
            selectedReport={selectedReport}
          />
          <ActionWindow
            availableContracts={availableContracts}
            setAvailableContracts={setAvailableContracts}
            showContractInfo={showContractInfo}
            setShowContractInfo={setShowContractInfo}
            showDamageReport={showDamageReport}
            setShowDamageReport={setShowDamageReport}
            showCounterOffer={showCounterOffer}
            closeInfoOrReport={closeInfoOrReport}
            newDamageReports={newDamageReports}
            selectedReport={selectedReport}
            selectedContract={selectedContract}
            selectedUpdateHash={selectedUpdateHash}
            setSelectedReport={setSelectedReport}
            showPendingInfo={showPendingInfo}
            selectedPendingContract={selectedPendingContract}
            setSelectedPendingContract={setSelectedPendingContract}
            accAddr={accAddr}
          />
          <ActiveContracts
            availableContracts={availableContracts}
            openContractInfo={openContractInfo}
            setSelectedContract={setSelectedContract}
            setSelectedUpdateHash={setSelectedUpdateHash}
            selectedReport={selectedReport}
            selectedContract={selectedContract}
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
