import axios from "axios";
// import moment from "moment";
import { useState } from "react";

function ReportForm(props) {
  const [damageReport, setDamageReport] = useState({
    date: "",
    attack_type: "",
    damage_amount: 0,
    log_file_content: "",
  });
  const [isLogFile, setIsLogFile] = useState(false);

  const [damageReportResponse, setDamageReportResponse] = useState("");

  const handleDateChange = (e) => {
    let temp = { ...damageReport };
    temp.date = e.target.value;
    setDamageReport(temp);
  };

  // const formatDate = () => {
  //   let temp = { ...damageReport };
  //   temp.date = moment(damageReport.date).format("DD.MM.YYYY");
  //   setDamageReport(temp);
  // };

  const handleAttackTypeChange = (e) => {
    let temp = { ...damageReport };
    temp.attack_type = e.target.value;
    setDamageReport(temp);
  };

  const handleDamageAmountChange = (e) => {
    let temp = { ...damageReport };
    temp.damage_amount = e.target.value;
    setDamageReport(temp);
  };

  const handleLogFileChange = (e) => {
    // let temp = { ...damageReport };
    // temp.log_file_content = e.target.files[0];
    // setDamageReport(temp);
    // console.log(damageReport.log_file_content);
    // console.log(e.target.files[0]);
    // const fileReader = new FileReader();
    // const fileString = fileReader.readAsText(e.target.files[0]);
    // console.log(fileString);
    // setIsLogFile(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      let temp = { ...damageReport };
      temp.log_file_content = text;
      setDamageReport(temp);
      setIsLogFile(true);
      // console.log(text);
    };
    reader.readAsText(e.target.files[0]);
    //-->This function sets the damageReport.logfile-state to a string generated on logfile
  };

  const reportDamage = (e) => {
    if (!isLogFile) {
      alert("A Logfile needs to be uploaded!");
      return;
    }
    // formatDate();
    const json_content = JSON.stringify(damageReport);
    console.log(json_content);
    axios
      .post("http://127.0.0.1:5001/reportDamage2", json_content, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setDamageReportResponse(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <>
      <button onClick={props.closeReportForm}>Close Report Form</button>
      <br />
      <br />
      <br />
      <div>
        <label id="date">Date of incident: </label>
        <br />
        <input
          onChange={handleDateChange}
          value={damageReport.date}
          name="date"
          type="date"
        />
        <br />
        <br />
        <label id="attack_type">
          Attack type:{" "}
          <select
            value={damageReport.attack_type}
            name="attack_type"
            onChange={handleAttackTypeChange}
          >
            <option value="">Select...</option>
            <option value="DDoS/DoS">DDoS/DoS</option>
            <option value="Malware">Malware</option>
            <option value="Ransomware">Ransomware</option>
            <option value="Phishing">Phishing</option>
            <option value="Man-in-the-middle attack">
              Man-in-the-middle attack
            </option>
            <option value="SQL injection">SQL injection</option>
            <option value="Zero-day exploit">Zero-day exploit</option>
            <option value="DNS Tunneling">DNS Tunneling</option>
            <option value="BEC">Business Email Compromise (BEC)</option>
            <option value="Cryptojacking">Cryptojacking</option>
            <option value="Drive-by attack">Drive-by Attack</option>
            <option value="XSS">Cross-site scripting (XSS) attack</option>
            <option value="Password attack">Password Attack</option>
            <option value="Eavesdropping attack">Eavesdropping attack</option>
            <option value="AI-powered attack">AI-powered attack</option>
            <option value="IoT-based attack">IoT-based attack</option>
          </select>
        </label>
        <br />
        <br />
        <label>Damage amount (in Euro): </label>
        <br />
        <input
          onChange={handleDamageAmountChange}
          type="number"
          value={damageReport.damage_amount}
          name="damage_amount"
        />
        <br />
        <br />
        <label id="log_file_content">Log File: </label>
        <br />
        <input
          type="file"
          name="log_file_content"
          onChange={handleLogFileChange}
        />
        {/* {isLogFile && (
          <div>
            Log File Content: <br />
            <br />
            {damageReport.log_file_content}
          </div>
        )} */}
        <br />
        <br />
        <br />
        <div>{damageReportResponse}</div>
        <button style={{ padding: "10px" }} onClick={reportDamage}>
          Send Damage Report
        </button>
      </div>
    </>
  );
}

export default ReportForm;
