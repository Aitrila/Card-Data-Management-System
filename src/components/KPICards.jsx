function KPICards({ contacts }) {
  const totalContacts = contacts.length;

  const totalCompanies = new Set(
    contacts
      .map((contact) => contact.Company)
      .filter((company) => company)
  ).size;

  const totalDesignations = new Set(
    contacts
      .map((contact) => contact.Designation)
      .filter((designation) => designation)
  ).size;

  const completeRecords = contacts.filter(
    (contact) =>
      contact.Name &&
      contact.Designation &&
      contact.Company &&
      contact.Email &&
      contact["Phone No."]
  ).length;

  const dataQuality =
    totalContacts > 0
      ? Math.round((completeRecords / totalContacts) * 100)
      : 0;

  return (
    <div className="kpi-grid">

      <div className="kpi-card">
        <div className="kpi-top">
          <div className="kpi-icon blue">👥</div>
          <span>Total Contacts</span>
        </div>

        <h2>{totalContacts}</h2>

        <p>Business contacts database</p>
      </div>

      <div className="kpi-card">
        <div className="kpi-top">
          <div className="kpi-icon green">🏢</div>
          <span>Total Companies</span>
        </div>

        <h2>{totalCompanies}</h2>

        <p>Unique organizations</p>
      </div>

      <div className="kpi-card">
        <div className="kpi-top">
          <div className="kpi-icon purple">💼</div>
          <span>Total Designations</span>
        </div>

        <h2>{totalDesignations}</h2>

        <p>Job roles identified</p>
      </div>

      <div className="kpi-card">
        <div className="kpi-top">
          <div className="kpi-icon orange">⭐</div>
          <span>Data Quality</span>
        </div>

        <h2>{dataQuality}%</h2>

        <p>Complete business records</p>
      </div>

    </div>
  );
}

export default KPICards;