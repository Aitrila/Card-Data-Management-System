function MissingFields({ contacts }) {
  const total = contacts.length;

  const missingEmails = contacts.filter(
    (c) => !c.Email || c.Email.trim() === ""
  ).length;

  const missingPhones = contacts.filter(
    (c) => !c["Phone No."] || c["Phone No."].trim() === ""
  ).length;

  const missingCompanies = contacts.filter(
    (c) => !c.Company || c.Company.trim() === ""
  ).length;

  const missingDesignations = contacts.filter(
    (c) => !c.Designation || c.Designation.trim() === ""
  ).length;

  const emailPercent =
    total > 0 ? ((missingEmails / total) * 100).toFixed(1) : 0;

  const phonePercent =
    total > 0 ? ((missingPhones / total) * 100).toFixed(1) : 0;

  const companyPercent =
    total > 0 ? ((missingCompanies / total) * 100).toFixed(1) : 0;

  const designationPercent =
    total > 0 ? ((missingDesignations / total) * 100).toFixed(1) : 0;

  return (
    <div className="card dark-panel">
      <div className="panel-header">
        <div>
          <h3>Missing Fields Analysis</h3>
          <p>Overview of incomplete data fields</p>
        </div>
      </div>

      <div className="modern-grid">

        <div className="modern-card blue-card">
          <div className="modern-icon">📧</div>
          <h4>Missing Emails</h4>
          <h2>{missingEmails}</h2>
          <span>{emailPercent}% of total</span>
          <div className="progress blue-progress"></div>
        </div>

        <div className="modern-card green-card">
          <div className="modern-icon">📞</div>
          <h4>Missing Phones</h4>
          <h2>{missingPhones}</h2>
          <span>{phonePercent}% of total</span>
          <div className="progress green-progress"></div>
        </div>

        <div className="modern-card purple-card">
          <div className="modern-icon">🏢</div>
          <h4>Missing Companies</h4>
          <h2>{missingCompanies}</h2>
          <span>{companyPercent}% of total</span>
          <div className="progress purple-progress"></div>
        </div>

        <div className="modern-card orange-card">
          <div className="modern-icon">💼</div>
          <h4>Missing Designations</h4>
          <h2>{missingDesignations}</h2>
          <span>{designationPercent}% of total</span>
          <div className="progress orange-progress"></div>
        </div>

      </div>
    </div>
  );
}

export default MissingFields;