import axios from "axios";
import { useState } from "react";

function InputCIForm() {
  const [contractInformation, setContractInformation] = useState({
    business_information: {
      companyName: "TestAG",
      type: "AG",
      sector: "Electronic Store",
      address: {
        streetAddress: "Examplestr 1",
        city: "Zurich",
        state: "ZH",
        postalCode: 8000,
      },
      contact: [
        {
          type: "phone",
          number: "123456789",
        },
        {
          type: "mail",
          number: "abc@testAG.com",
        },
      ],
    },
    contract_constraints: {
      startDate: "01.01.2021",
      endDate: "31.12.2023",
      paymentFrequencyPerYear: 2,
      cancellation: {
        allowed: true,
        penaltyInPercent: 50,
      },
    },
    company_conditions: {
      yearly_revenue: 2500000,
      revenue: 0.2,
      basedOnYear: 2019,
      numberOfEmployees: 10,
    },
    company_security: {
      risk_assessment_metrics: [
        {
          name: "SECONOMY",
          result: "low",
        },
        {
          name: "Known vulnerabilities",
          result: "medium",
        },
        {
          name: "Level of cybersecurity education",
          result: "low",
        },
      ],
      attacks_history: [
        {
          type: "DDoS",
          date: "15/01/2019",
          time_to_recovery: "4 hours",
          details: "None",
          mitigated: true,
        },
        {
          type: "DDoS",
          date: "15/01/2019",
          time_to_recovery: "15 hours",
          details: "Mirai Botnet",
          mitigated: false,
        },
        {
          type: "Ransomware",
          date: "09/01/2020",
          time_to_recovery: "26 days",
          details: "WannaCry",
          mitigated: false,
        },
        {
          type: "Malware",
          date: "12/07/2020",
          time_to_recovery: "2 days",
          details: "Family XYZ",
          mitigated: true,
        },
      ],
      security_software: [
        {
          name: "Kaspersky",
          type: "antivirus",
        },
        {
          name: "Dynatrace",
          type: "monitoring",
        },
        {
          name: "AWS Firewall Manager",
          type: "firewall manager",
        },
      ],
      security_training: [
        {
          name: "ABCD security certificate",
          type: "pentest",
          date: "15/02/2020",
          provider: "ICI",
        },
        {
          name: "ZYX security certificate",
          type: "education of employees",
          date: "26/04/2020",
          provider: "ICI",
        },
      ],
    },
    company_infrastructure: {
      number_connected_devices: 50,
      number_systems: 2,
      technologies: [
        {
          type: "os",
          name: "windows",
          version: "XP",
          updates: false,
        },
        {
          type: "core software",
          name: "Docker",
          version: "19.0.8",
          updates: false,
        },
      ],
      critical_data: "3 TB",
      critical_services: ["data privacy", "marketplace", "payment system"],
    },
    contract_coverage: [
      {
        name: "DDoS",
        coverage: [
          {
            name: "business interruption",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "delivery failure",
            coverage_ratio: 10,
          },
          {
            name: "third person damage",
            coverage_ratio: 50,
            deductible: 1000,
            max_indemnification: 300000,
          },

          {
            name: "cyber extortion",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
        ],
      },
      {
        name: "data breach",
        coverage: [
          {
            name: "delivery failure",
            coverage_ratio: 50,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "third person damage",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "privacy law violation",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "cyber extortion",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
        ],
      },
      {
        name: "social engineering",
        coverage: [
          {
            name: "business interruption",
            coverage_ratio: 50,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "delivery failure",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "third person damage",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "privacy law violation",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
          {
            name: "cyber extortion",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
        ],
      },
    ],
  });

  const [premiumResponse, setPremiumResponse] = useState("");
  const [showPremium, setShowPremium] = useState(false);

  const [showCreated, setShowCreated] = useState(false);
  const [createdResponse, setCreatedResponse] = useState("");

  const addContact = (e) => {
    let temp = { ...contractInformation };
    temp.business_information.contact.push({
      type: "",
      number: "",
    });
    setContractInformation(temp);
  };

  const addMetrics = (e) => {
    let temp = { ...contractInformation };
    temp.company_security.risk_assessment_metrics.push({
      name: "",
      result: "",
    });
    setContractInformation(temp);
  };

  const addAttack = (e) => {
    let temp = { ...contractInformation };
    temp.company_security.attacks_history.push({
      type: "",
      date: "",
      time_to_recovery: "",
      details: "",
      mitigated: true,
    });
    setContractInformation(temp);
  };

  const addSecuritySoftware = (e) => {
    let temp = { ...contractInformation };
    temp.company_security.security_software.push({
      name: "",
      type: "",
    });
    setContractInformation(temp);
  };

  const addSecurityTraining = (e) => {
    let temp = { ...contractInformation };
    temp.company_security.security_training.push({
      name: "",
      type: "",
      date: "",
      provider: "",
    });
    setContractInformation(temp);
  };

  const addTechnologies = (e) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.technologies.push({
      type: "",
      name: "",
      version: "",
      updates: false,
    });
    setContractInformation(temp);
  };

  const addCriticalServices = (e) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.critical_services.push("");
    setContractInformation(temp);
  };

  const addContractCoverage = (e) => {
    let temp = { ...contractInformation };
    temp.contract_coverage.push({
      name: "",
      coverage: [
        {
          name: "",
          coverage_ratio: 0,
          deductible: 0,
          max_indemnification: 0,
        },
      ],
    });
    setContractInformation(temp);
  };

  const addSubCoverage = (e, i) => {
    let temp = { ...contractInformation };
    temp.contract_coverage[i].coverage.push({
      name: "",
      coverage_ratio: 0,
      deductible: 0,
      max_indemnification: 0,
    });
    setContractInformation(temp);
  };

  const deleteContact = (e, i) => {
    let temp = { ...contractInformation };
    temp.business_information.contact.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteMetrics = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.risk_assessment_metrics.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteAttack = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.attacks_history.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteSecuritySoftware = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.security_software.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteSecurityTraining = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.security_training.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteTechnologies = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.technologies.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteCriticalServices = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.critical_services.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteContractCoverage = (e, i) => {
    let temp = { ...contractInformation };
    temp.contract_coverage.splice(i, 1);
    setContractInformation(temp);
  };

  const deleteSubCoverage = (e, i, j) => {
    let temp = { ...contractInformation };
    temp.contract_coverage[i].coverage.splice(j, 1);
    setContractInformation(temp);
  };

  const handleBIChange = (e) => {
    let temp = { ...contractInformation };
    temp.business_information[e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleAddressChange = (e) => {
    let temp = { ...contractInformation };
    temp.business_information.address[e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleContactChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.business_information.contact[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleContractConstraintsChange = (e) => {
    let temp = { ...contractInformation };
    temp.contract_constraints[e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handlePaymentFreq = (e) => {
    let temp = { ...contractInformation };
    temp.contract_constraints.paymentFrequencyPerYear = e.target.valueAsNumber;
    setContractInformation(temp);
  };

  const handleCancellationChange = (e) => {
    let temp = { ...contractInformation };
    temp.contract_constraints.cancellation.allowed =
      !contractInformation.contract_constraints.cancellation.allowed;
    setContractInformation(temp);
  };

  const handlePenaltyChange = (e) => {
    let temp = { ...contractInformation };
    temp.contract_constraints.cancellation.penaltyInPercent =
      e.target.valueAsNumber;
    setContractInformation(temp);
  };

  const handleConditionsChange = (e) => {
    let temp = { ...contractInformation };
    temp.company_conditions[e.target.name] = e.target.valueAsNumber;
    setContractInformation(temp);
  };

  const handleMetricChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.risk_assessment_metrics[i][e.target.name] =
      e.target.value;
    setContractInformation(temp);
  };

  const handleAttackHistoryChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.attacks_history[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleMitigatedChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.attacks_history[i].mitigated =
      !contractInformation.company_security.attacks_history[i].mitigated;
  };

  const handleSecuritySoftwareChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.security_software[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleSecurityTrainingChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_security.security_training[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleInfrastructureNumberChange = (e) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure[e.target.name] = e.target.valueAsNumber;
    setContractInformation(temp);
  };

  const handleCriticalDataChange = (e) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.critical_data = e.target.value;
    setContractInformation(temp);
  };

  const handleTechnologyChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.technologies[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleTechnologyUpdateChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.technologies[i].updates =
      !contractInformation.company_infrastructure.technologies[i].updates;
    setContractInformation(temp);
  };

  const handleCriticalServicesChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.company_infrastructure.critical_services[i] = e.target.value;
    setContractInformation(temp);
  };

  const handleContractCoverageChange = (e, i) => {
    let temp = { ...contractInformation };
    temp.contract_coverage[i][e.target.name] = e.target.value;
    setContractInformation(temp);
  };

  const handleSubCoverageStringChange = (e, i, j) => {
    let temp = { ...contractInformation };
    temp.contract_coverage[i].coverage[j].name = e.target.value;
    setContractInformation(temp);
  };

  const handleSubCoverageNumberChange = (e, i, j) => {
    let temp = { ...contractInformation };
    temp.contract_coverage[i].coverage[j][e.target.name] =
      e.target.valueAsNumber;
    setContractInformation(temp);
  };

  const submit = (e) => {
    const json_content = JSON.stringify(contractInformation);
    console.log(json_content);
    axios
      .post("http://127.0.0.1:5001/createContract2", json_content, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setCreatedResponse(res.data);
        setShowCreated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculatePremium = (e) => {
    const json_content = JSON.stringify(contractInformation);
    axios
      .post("http://127.0.0.1:5001/calculatePremium2", json_content, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPremiumResponse(res.data);
        setShowPremium(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <label id="companyName">Company Name: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={contractInformation.business_information.companyName}
        name="companyName"
        aria-labelledby="companyName"
      />
      <br />
      <label id="type">Company Type: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={contractInformation.business_information.type}
        name="type"
        aria-labelledby="type"
      />
      <br />
      <label id="sector">Company Sector: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={contractInformation.business_information.sector}
        name="sector"
        aria-labelledby="sector"
      />
      <br />
      <label id="streetAddress">Street Address: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={contractInformation.business_information.address.streetAddress}
        name="streetAddress"
        aria-labelledby="streetAddress"
      />
      <br />
      <label id="city">City: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={contractInformation.business_information.address.city}
        name="city"
        aria-labelledby="city"
      />
      <br />
      <label id="state">State: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={contractInformation.business_information.address.state}
        name="state"
        aria-labelledby="state"
      />
      <br />
      <label id="postalCode">Postal code: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={contractInformation.business_information.address.postalCode}
        name="postalCode"
        aria-labelledby="postalCode"
        type="number"
      />
      <br />
      <br />
      {contractInformation.business_information.contact.map((contact, i) => (
        <div key={i}>
          <br />
          <label>Contact Type: </label>
          <br />
          <input
            onChange={(e) => handleContactChange(e, i)}
            value={contractInformation.business_information.contact[i].type}
            name="type"
          />
          <br />
          <label>Contact Number: </label>
          <br />
          <input
            onChange={(e) => handleContactChange(e, i)}
            value={contractInformation.business_information.contact[i].number}
            name="number"
          />
          <br />
          <button type="button" onClick={(e) => deleteContact(e, i)}>
            Delete Contact
          </button>
          <br />
        </div>
      ))}
      <br />
      <button type="button" onClick={addContact}>
        Add Contact
      </button>
      <br />
      <br />
      <br />
      <label>Start Date: </label>
      <br />
      {/* TODO: the form should already show the date as placeholder */}
      <input
        onChange={handleContractConstraintsChange}
        type="date"
        value={contractInformation.contract_constraints.startDate}
        name="startDate"
      />
      <br />
      {/* TODO: the form should already show the date as placeholder */}

      <label>End Date: </label>
      <br />
      <input
        onChange={handleContractConstraintsChange}
        type="date"
        value={contractInformation.contract_constraints.endDate}
        name="endDate"
      />
      <br />
      <label>Payment Freq. per Year: </label>
      <br />
      <input
        onChange={handlePaymentFreq}
        type="number"
        value={contractInformation.contract_constraints.paymentFrequencyPerYear}
        name="paymentFrequencyPerYear"
      />
      <br />
      <label>Cancellation Allowed? </label>
      <br />
      <input
        onChange={handleCancellationChange}
        name="allowed"
        type="checkbox"
        defaultChecked={
          contractInformation.contract_constraints.cancellation.allowed
        }
      />
      <br />
      <label>Penalty in % (only when cancellation allowed): </label>
      <br />
      <input
        onChange={handlePenaltyChange}
        name="penaltyInPercent"
        type="number"
        min="0"
        max="100"
        value={
          contractInformation.contract_constraints.cancellation.penaltyInPercent
        }
      />
      <br />
      <label>Yearly Revenue: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="yearly_revenue"
        value={contractInformation.company_conditions.yearly_revenue}
        type="number"
      />
      <br />
      <label>Revenue % due to technology (between 0 and 1): </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="revenue"
        type="number"
        max={1}
        value={contractInformation.company_conditions.revenue}
      />
      <br />
      <label>Based on Year: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="basedOnYear"
        value={contractInformation.company_conditions.basedOnYear}
        type="number"
      />
      <br />
      <label>Number of Employees: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="numberOfEmployees"
        value={contractInformation.company_conditions.numberOfEmployees}
        type="number"
      />
      <br />
      <br />
      {contractInformation.company_security.risk_assessment_metrics.map(
        (metric, i) => (
          <div key={i}>
            <br />
            <label>
              Risk Assessment Metric Name:{" "}
              <select
                value={
                  contractInformation.company_security.risk_assessment_metrics[
                    i
                  ].name
                }
                name="name"
                onChange={(e) => handleMetricChange(e, i)}
              >
                <option value="SEConomy">SEConomy (economic impact)</option>
                <option value="Known vulnerabilities">
                  Known vulnerabilities
                </option>
                <option value="Level of cybersecurity education">
                  Level of cybersecurity education
                </option>
              </select>
            </label>
            <br />
            <label>
              Result:{" "}
              <select
                value={
                  contractInformation.company_security.risk_assessment_metrics[
                    i
                  ].result
                }
                name="result"
                onChange={(e) => handleMetricChange(e, i)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <br />
            <br />
            <button type="button" onClick={(e) => deleteMetrics(e, i)}>
              Delete Risk Assessment Metric
            </button>
            <br />
          </div>
        )
      )}
      <br />
      <button type="button" onClick={addMetrics}>
        Add Risk Assessment Metric
      </button>
      <br />
      <br />
      {contractInformation.company_security.attacks_history.map((attack, i) => (
        <div key={i}>
          <br />
          <label>
            Type of occured Attack:{" "}
            <select
              value={
                contractInformation.company_security.attacks_history[i].type
              }
              name="type"
              onChange={(e) => handleAttackHistoryChange(e, i)}
            >
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
          <label>Date of incident: </label>
          <br />
          <input
            onChange={(e) => handleAttackHistoryChange(e, i)}
            value={contractInformation.company_security.attacks_history[i].date}
            name="date"
            type="date"
          />
          <br />
          <label>Time to recovery: </label>
          <br />
          <input
            onChange={(e) => handleAttackHistoryChange(e, i)}
            value={
              contractInformation.company_security.attacks_history[i]
                .time_to_recovery
            }
            name="time_to_recovery"
          />
          <br />
          <label>Details: </label>
          <br />
          <input
            onChange={(e) => handleAttackHistoryChange(e, i)}
            value={
              contractInformation.company_security.attacks_history[i].details
            }
            name="details"
          />
          <br />
          <label>Attack mitigated? </label>
          <br />
          <input
            onChange={(e) => handleMitigatedChange(e, i)}
            name="mitigated"
            type="checkbox"
            defaultChecked={
              contractInformation.company_security.attacks_history[i].mitigated
            }
          />
          <br />
          <button type="button" onClick={(e) => deleteAttack(e, i)}>
            Delete occured Attack
          </button>
          <br />
        </div>
      ))}
      <br />
      <button type="button" onClick={addAttack}>
        Add occured Attack
      </button>
      <br />
      <br />
      {contractInformation.company_security.security_software.map(
        (software, i) => (
          <div key={i}>
            <br />
            <label>Security Software Name: </label>
            <br />
            <input
              onChange={(e) => handleSecuritySoftwareChange(e, i)}
              value={
                contractInformation.company_security.security_software[i].name
              }
              name="name"
            />
            <br />
            <label>Security Software Type: </label>
            <br />
            <input
              onChange={(e) => handleSecuritySoftwareChange(e, i)}
              value={
                contractInformation.company_security.security_software[i].type
              }
              name="type"
            />
            <br />
            <button type="button" onClick={(e) => deleteSecuritySoftware(e, i)}>
              Delete Security Software
            </button>
            <br />
          </div>
        )
      )}
      <br />
      <button type="button" onClick={addSecuritySoftware}>
        Add Security Software
      </button>
      <br />
      <br />
      {contractInformation.company_security.security_training.map(
        (training, i) => (
          <div key={i}>
            <br />
            <label>Security Training Name: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                contractInformation.company_security.security_training[i].name
              }
              name="name"
            />
            <br />
            <label>Security Training Type: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                contractInformation.company_security.security_training[i].type
              }
              name="type"
            />
            <br />
            <label>Security Training Date: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                contractInformation.company_security.security_training[i].date
              }
              name="date"
              type="date"
            />
            <br />
            <label>Security Training Provider: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                contractInformation.company_security.security_training[i]
                  .provider
              }
              name="provider"
            />
            <br />
            <button type="button" onClick={(e) => deleteSecurityTraining(e, i)}>
              Delete Security Training
            </button>
            <br />
          </div>
        )
      )}
      <br />
      <button type="button" onClick={addSecurityTraining}>
        Add Security Training
      </button>
      <br />
      <br />
      <br />
      <label>Number of connected devices: </label>
      <br />
      <input
        onChange={handleInfrastructureNumberChange}
        name="number_connected_devices"
        type="number"
        value={
          contractInformation.company_infrastructure.number_connected_devices
        }
      />
      <br />
      <label>Number of Systems: </label>
      <br />
      <input
        onChange={handleInfrastructureNumberChange}
        name="number_systems"
        type="number"
        value={contractInformation.company_infrastructure.number_systems}
      />
      <br />
      {contractInformation.company_infrastructure.technologies.map(
        (tech, i) => (
          <div key={i}>
            <br />
            <br />
            <label>Technology Type: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                contractInformation.company_infrastructure.technologies[i].type
              }
              name="type"
            />
            <br />
            <label>Technology Name: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                contractInformation.company_infrastructure.technologies[i].name
              }
              name="name"
            />
            <br />
            <label>Technology Version: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                contractInformation.company_infrastructure.technologies[i]
                  .version
              }
              name="version"
            />
            <br />
            <label>Latest updates installed: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyUpdateChange(e, i)}
              defaultChecked={
                contractInformation.company_infrastructure.technologies[i]
                  .updates
              }
              name="updates"
              type="checkbox"
            />
            <br />
            <button type="button" onClick={(e) => deleteTechnologies(e, i)}>
              Delete Technology
            </button>
            <br />
          </div>
        )
      )}
      <br />
      <button type="button" onClick={addTechnologies}>
        Add Technology
      </button>
      <br />
      <br />
      <br />
      <label>Critical Data Amount: </label>
      <br />
      <input
        name="critical_data"
        onChange={handleCriticalDataChange}
        value={contractInformation.company_infrastructure.critical_data}
      />
      <br />
      <br />
      {contractInformation.company_infrastructure.critical_services.map(
        (service, i) => (
          <div key={i}>
            <label>Critical Service: </label>
            <br />
            <input
              onChange={(e) => handleCriticalServicesChange(e, i)}
              value={
                contractInformation.company_infrastructure.critical_services[i]
              }
              name="critical_services"
            />
            <br />
            <button type="button" onClick={(e) => deleteCriticalServices(e, i)}>
              Delete Critical Service
            </button>
            <br />
            <br />
          </div>
        )
      )}
      <button type="button" onClick={addCriticalServices}>
        Add Critical Service
      </button>
      <br />
      <br />
      <br />
      {contractInformation.contract_coverage.map((c1, i) => (
        <div
          key={i}
          style={{
            borderStyle: "solid",
            padding: "5px",
            marginBottom: "30px",
            marginTop: "20px",
            borderColor: "blue",
          }}
        >
          <label>Attack Type to cover: </label>
          <br />
          <select
            value={contractInformation.contract_coverage[i].name}
            name="name"
            onChange={(e) => handleContractCoverageChange(e, i)}
          >
            <option value="DDoS/DoS">DDoS/DoS</option>
            <option value="social engineering">Social Engineering</option>
            <option value="data breach">Data Breach</option>
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
          <br />
          <br />
          <button type="button" onClick={(e) => deleteContractCoverage(e, i)}>
            Delete Attack Type to cover
          </button>
          <br />
          <br />
          {c1.coverage.map((c2, j) => (
            <div key={(i, j)}>
              <label>
                Covered Damage Type Name:{" "}
                <select
                  value={
                    contractInformation.contract_coverage[i].coverage[j].name
                  }
                  name="name"
                  onChange={(e) => handleSubCoverageStringChange(e, i, j)}
                >
                  <option value="incident response">
                    Incident Response/Crisis Management
                  </option>
                  <option value="data recovery">
                    Data Recovery/System Restoration
                  </option>
                  <option value="forensics">Forensics</option>
                  <option value="notification">Notification</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="public relations">
                    Public Relations/Reputation
                  </option>
                  <option value="business interruption">
                    Business Interruption
                  </option>
                  <option value="cyber extortion">Cyber Extortion</option>
                  <option value="loss of digital assets">
                    Loss of digital assets
                  </option>
                  <option value="privacy law violation">
                    Privacy Law Violation
                  </option>
                  <option value="third party business interruption">
                    Third-Party Business Interruption
                  </option>
                  <option value="regulatory fines">
                    Regulatory fines and penalties
                  </option>
                  <option value="omissions">Errors and Omissions</option>
                  <option value="multi-media liability">
                    Multi-Media Liability
                  </option>
                  <option value="administrative reissuing">
                    Administrative Reissuing
                  </option>
                  <option value="delivery failure">Delivery Failure</option>
                  <option value="third person damage">
                    Third person damage
                  </option>
                </select>
              </label>
              <br />
              <label>Coverage Ratio for damage type: </label>
              <br />
              <input
                onChange={(e) => handleSubCoverageNumberChange(e, i, j)}
                value={
                  contractInformation.contract_coverage[i].coverage[j]
                    .coverage_ratio
                }
                name="coverage_ratio"
                type="number"
              />
              <br />
              <label>Deductible for damage type: </label>
              <br />
              <input
                onChange={(e) => handleSubCoverageNumberChange(e, i, j)}
                value={
                  contractInformation.contract_coverage[i].coverage[j]
                    .deductible
                }
                name="deductible"
                type="number"
              />
              <br />
              <label>Max. Indemnification for damage type: </label>
              <br />
              <input
                onChange={(e) => handleSubCoverageNumberChange(e, i, j)}
                value={
                  contractInformation.contract_coverage[i].coverage[j]
                    .max_indemnification
                }
                name="max_indemnification"
                type="number"
              />
              <br />
              <button type="button" onClick={(e) => deleteSubCoverage(e, i, j)}>
                Delete Covered Damage type
              </button>
              <br />
              <br />
            </div>
          ))}
          <button type="button" onClick={(e) => addSubCoverage(e, i)}>
            Add Covered Damage Type
          </button>
          <br />
          <br />
          <br />
        </div>
      ))}
      <button type="button" onClick={addContractCoverage}>
        Add Attack Type to cover
      </button>
      <br />
      <br />
      <br />
      <div style={{ margin: "2px" }}>{showCreated && createdResponse}</div>
      <button style={{ marginRight: "5rem" }} type="button" onClick={submit}>
        Submit
      </button>
      <div style={{ margin: "2px" }}>{showPremium && premiumResponse}</div>
      <button type="button" onClick={calculatePremium}>
        Calculate Premium
      </button>
    </div>
  );
}

export default InputCIForm;
