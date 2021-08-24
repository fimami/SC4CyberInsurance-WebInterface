function UpdateForm(props) {
  const addMetrics = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_security.risk_assessment_metrics.push({
      name: "",
      result: "",
    });
    props.setContractInformation(temp);
  };

  const addAttack = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_security.attacks_history.push({
      type: "",
      date: "",
      time_to_recovery: "",
      details: "",
      mitigated: true,
    });
    props.setContractInformation(temp);
  };

  const addSecuritySoftware = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_software.push({
      name: "",
      type: "",
    });
    props.setContractInformation(temp);
  };

  const addSecurityTraining = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_training.push({
      name: "",
      type: "",
      date: "",
      provider: "",
    });
    props.setContractInformation(temp);
  };

  const addTechnologies = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.technologies.push({
      type: "",
      name: "",
      version: "",
      updates: false,
    });
    props.setContractInformation(temp);
  };

  const addCriticalServices = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.critical_services.push("");
    props.setContractInformation(temp);
  };

  const addContractCoverage = (e) => {
    let temp = { ...props.contractInformation };
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
    props.setContractInformation(temp);
  };

  const addSubCoverage = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage[i].coverage.push({
      name: "",
      coverage_ratio: 0,
      deductible: 0,
      max_indemnification: 0,
    });
    props.setContractInformation(temp);
  };

  const deleteMetrics = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.risk_assessment_metrics.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteAttack = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.attacks_history.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteSecuritySoftware = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_software.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteSecurityTraining = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_training.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteTechnologies = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.technologies.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteCriticalServices = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.critical_services.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteContractCoverage = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage.splice(i, 1);
    props.setContractInformation(temp);
  };

  const deleteSubCoverage = (e, i, j) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage[i].coverage.splice(j, 1);
    props.setContractInformation(temp);
  };

  const handleBIChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.business_information[e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleAddressChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.business_information.address[e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleContactChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.business_information.contact[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleContractConstraintsChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.contract_constraints[e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handlePaymentFreq = (e) => {
    let temp = { ...props.contractInformation };
    temp.contract_constraints.paymentFrequencyPerYear = e.target.valueAsNumber;
    props.setContractInformation(temp);
  };

  const handleCancellationChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.contract_constraints.cancellation.allowed =
      !props.contractInformation.contract_constraints.cancellation.allowed;
    props.setContractInformation(temp);
  };

  const handlePenaltyChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.contract_constraints.cancellation.penaltyInPercent =
      e.target.valueAsNumber;
    props.setContractInformation(temp);
  };

  const handleConditionsChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_conditions[e.target.name] = e.target.valueAsNumber;
    props.setContractInformation(temp);
  };

  const handleMetricChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.risk_assessment_metrics[i][e.target.name] =
      e.target.value;
    props.setContractInformation(temp);
  };

  const handleAttackHistoryChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.attacks_history[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleMitigatedChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.attacks_history[i].mitigated =
      !props.contractInformation.company_security.attacks_history[i].mitigated;
  };

  const handleSecuritySoftwareChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_software[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleSecurityTrainingChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_security.security_training[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleInfrastructureNumberChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure[e.target.name] = e.target.valueAsNumber;
    props.setContractInformation(temp);
  };

  const handleCriticalDataChange = (e) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.critical_data = e.target.value;
    props.setContractInformation(temp);
  };

  const handleTechnologyChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.technologies[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleTechnologyUpdateChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.technologies[i].updates =
      !props.contractInformation.company_infrastructure.technologies[i].updates;
    props.setContractInformation(temp);
  };

  const handleCriticalServicesChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.company_infrastructure.critical_services[i] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleContractCoverageChange = (e, i) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage[i][e.target.name] = e.target.value;
    props.setContractInformation(temp);
  };

  const handleSubCoverageStringChange = (e, i, j) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage[i].coverage[j].name = e.target.value;
    props.setContractInformation(temp);
  };

  const handleSubCoverageNumberChange = (e, i, j) => {
    let temp = { ...props.contractInformation };
    temp.contract_coverage[i].coverage[j][e.target.name] =
      e.target.valueAsNumber;
    props.setContractInformation(temp);
  };

  return (
    <div>
      <label id="companyName">Company Name: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={props.contractInformation.business_information.companyName}
        name="companyName"
        aria-labelledby="companyName"
        disabled={true}
      />
      <br />
      <label id="type">Company Type: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={props.contractInformation.business_information.type}
        name="type"
        aria-labelledby="type"
        disabled={true}
      />
      <br />
      <label id="sector">Company Sector: </label>
      <br />
      <input
        onChange={handleBIChange}
        value={props.contractInformation.business_information.sector}
        name="sector"
        aria-labelledby="sector"
        disabled={true}
      />
      <br />
      <label id="streetAddress">Street Address: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={
          props.contractInformation.business_information.address.streetAddress
        }
        name="streetAddress"
        aria-labelledby="streetAddress"
        disabled={true}
      />
      <br />
      <label id="city">City: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={props.contractInformation.business_information.address.city}
        name="city"
        aria-labelledby="city"
        disabled={true}
      />
      <br />
      <label id="state">State: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={props.contractInformation.business_information.address.state}
        name="state"
        aria-labelledby="state"
        disabled={true}
      />
      <br />
      <label id="postalCode">Postal code: </label>
      <br />
      <input
        onChange={handleAddressChange}
        value={
          props.contractInformation.business_information.address.postalCode
        }
        name="postalCode"
        aria-labelledby="postalCode"
        type="number"
        disabled={true}
      />
      <br />
      <br />
      {props.contractInformation.business_information.contact.map(
        (contact, i) => (
          <div key={i}>
            <br />
            <label>Contact Type: </label>
            <br />
            <input
              onChange={(e) => handleContactChange(e, i)}
              value={
                props.contractInformation.business_information.contact[i].type
              }
              name="type"
              disabled={true}
            />
            <br />
            <label>Contact Number: </label>
            <br />
            <input
              onChange={(e) => handleContactChange(e, i)}
              value={
                props.contractInformation.business_information.contact[i].number
              }
              name="number"
              disabled={true}
            />
            <br />
            <br />
          </div>
        )
      )}
      <br />
      <label>Start Date: </label>
      <br />
      <input
        onChange={handleContractConstraintsChange}
        type="date"
        value={props.contractInformation.contract_constraints.startDate}
        name="startDate"
        disabled={true}
      />
      <br />
      {/* TODO: the form should already show the date as placeholder */}

      <label>End Date: </label>
      <br />
      <input
        onChange={handleContractConstraintsChange}
        type="date"
        value={props.contractInformation.contract_constraints.endDate}
        name="endDate"
        disabled={true}
      />
      <br />
      <label>Payment Freq. per Year: </label>
      <br />
      <input
        onChange={handlePaymentFreq}
        type="number"
        value={
          props.contractInformation.contract_constraints.paymentFrequencyPerYear
        }
        name="paymentFrequencyPerYear"
        disabled={true}
      />
      <br />
      <label>Cancellation Allowed? </label>
      <br />
      <input
        onChange={handleCancellationChange}
        name="allowed"
        type="checkbox"
        defaultChecked={
          props.contractInformation.contract_constraints.cancellation.allowed
        }
        disabled={true}
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
          props.contractInformation.contract_constraints.cancellation
            .penaltyInPercent
        }
        disabled={true}
      />
      <br />
      <br />
      <br />
      <label>Yearly Revenue: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="yearly_revenue"
        value={props.contractInformation.company_conditions.yearly_revenue}
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
        value={props.contractInformation.company_conditions.revenue}
      />
      <br />
      <label>Based on Year: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="basedOnYear"
        value={props.contractInformation.company_conditions.basedOnYear}
        type="number"
      />
      <br />
      <label>Number of Employees: </label>
      <br />
      <input
        onChange={handleConditionsChange}
        name="numberOfEmployees"
        value={props.contractInformation.company_conditions.numberOfEmployees}
        type="number"
      />
      <br />
      <br />
      {props.contractInformation.company_security.risk_assessment_metrics.map(
        (metric, i) => (
          <div key={i}>
            <br />
            <label>
              Risk Assessment Metric Name:{" "}
              <select
                value={
                  props.contractInformation.company_security
                    .risk_assessment_metrics[i].name
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
                  props.contractInformation.company_security
                    .risk_assessment_metrics[i].result
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
      {props.contractInformation.company_security.attacks_history.map(
        (attack, i) => (
          <div key={i}>
            <br />
            <label>
              Type of occured Attack:{" "}
              <select
                value={
                  props.contractInformation.company_security.attacks_history[i]
                    .type
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
                <option value="Eavesdropping attack">
                  Eavesdropping attack
                </option>
                <option value="AI-powered attack">AI-powered attack</option>
                <option value="IoT-based attack">IoT-based attack</option>
              </select>
            </label>
            <br />
            <label>Date of incident: </label>
            <br />
            <input
              onChange={(e) => handleAttackHistoryChange(e, i)}
              value={
                props.contractInformation.company_security.attacks_history[i]
                  .date
              }
              name="date"
              type="date"
            />
            <br />
            <label>Time to recovery: </label>
            <br />
            <input
              onChange={(e) => handleAttackHistoryChange(e, i)}
              value={
                props.contractInformation.company_security.attacks_history[i]
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
                props.contractInformation.company_security.attacks_history[i]
                  .details
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
                props.contractInformation.company_security.attacks_history[i]
                  .mitigated
              }
            />
            <br />
            <button type="button" onClick={(e) => deleteAttack(e, i)}>
              Delete occured Attack
            </button>
            <br />
          </div>
        )
      )}
      <br />
      <button type="button" onClick={addAttack}>
        Add occured Attack
      </button>
      <br />
      <br />
      {props.contractInformation.company_security.security_software.map(
        (software, i) => (
          <div key={i}>
            <br />
            <label>Security Software Name: </label>
            <br />
            <input
              onChange={(e) => handleSecuritySoftwareChange(e, i)}
              value={
                props.contractInformation.company_security.security_software[i]
                  .name
              }
              name="name"
            />
            <br />
            <label>Security Software Type: </label>
            <br />
            <input
              onChange={(e) => handleSecuritySoftwareChange(e, i)}
              value={
                props.contractInformation.company_security.security_software[i]
                  .type
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
      {props.contractInformation.company_security.security_training.map(
        (training, i) => (
          <div key={i}>
            <br />
            <label>Security Training Name: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                props.contractInformation.company_security.security_training[i]
                  .name
              }
              name="name"
            />
            <br />
            <label>Security Training Type: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                props.contractInformation.company_security.security_training[i]
                  .type
              }
              name="type"
            />
            <br />
            <label>Security Training Date: </label>
            <br />
            <input
              onChange={(e) => handleSecurityTrainingChange(e, i)}
              value={
                props.contractInformation.company_security.security_training[i]
                  .date
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
                props.contractInformation.company_security.security_training[i]
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
          props.contractInformation.company_infrastructure
            .number_connected_devices
        }
      />
      <br />
      <label>Number of Systems: </label>
      <br />
      <input
        onChange={handleInfrastructureNumberChange}
        name="number_systems"
        type="number"
        value={props.contractInformation.company_infrastructure.number_systems}
      />
      <br />
      {props.contractInformation.company_infrastructure.technologies.map(
        (tech, i) => (
          <div key={i}>
            <br />
            <br />
            <label>Technology Type: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                props.contractInformation.company_infrastructure.technologies[i]
                  .type
              }
              name="type"
            />
            <br />
            <label>Technology Name: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                props.contractInformation.company_infrastructure.technologies[i]
                  .name
              }
              name="name"
            />
            <br />
            <label>Technology Version: </label>
            <br />
            <input
              onChange={(e) => handleTechnologyChange(e, i)}
              value={
                props.contractInformation.company_infrastructure.technologies[i]
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
                props.contractInformation.company_infrastructure.technologies[i]
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
        value={props.contractInformation.company_infrastructure.critical_data}
      />
      <br />
      <br />
      {props.contractInformation.company_infrastructure.critical_services.map(
        (service, i) => (
          <div key={i}>
            <label>Critical Service: </label>
            <br />
            <input
              onChange={(e) => handleCriticalServicesChange(e, i)}
              value={
                props.contractInformation.company_infrastructure
                  .critical_services[i]
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
      {props.contractInformation.contract_coverage.map((c1, i) => (
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
            value={props.contractInformation.contract_coverage[i].name}
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
                    props.contractInformation.contract_coverage[i].coverage[j]
                      .name
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
                  props.contractInformation.contract_coverage[i].coverage[j]
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
                  props.contractInformation.contract_coverage[i].coverage[j]
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
                  props.contractInformation.contract_coverage[i].coverage[j]
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
      {props.showUpdateResponse && <div>{props.updateResponse}</div>}
      <br />
      <button
        style={{ marginRight: "5rem" }}
        type="button"
        onClick={props.onSubmit}
      >
        Update Contract
      </button>
    </div>
  );
}

export default UpdateForm;
