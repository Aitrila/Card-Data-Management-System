function BusinessInsights({ contacts }) {
  const total = contacts.length;

  // Top Company
  const companyCount = {};

  contacts.forEach((contact) => {
    if (contact.Company) {
      companyCount[contact.Company] =
        (companyCount[contact.Company] || 0) + 1;
    }
  });

  const topCompany =
    Object.entries(companyCount).sort((a, b) => b[1] - a[1])[0] || [
      "-",
      0,
    ];

  // Top Designation
  const designationCount = {};

  contacts.forEach((contact) => {
    if (contact.Designation) {
      designationCount[contact.Designation] =
        (designationCount[contact.Designation] || 0) + 1;
    }
  });

  const topDesignation =
    Object.entries(designationCount).sort((a, b) => b[1] - a[1])[0] || [
      "-",
      0,
    ];

  // Complete Records
  const completeRecords = contacts.filter(
    (contact) =>
      contact.Name &&
      contact.Designation &&
      contact.Company &&
      contact.Email &&
      contact["Phone No."]
  ).length;

  // Data Quality
  const dataQuality =
    total > 0
      ? Math.round((completeRecords / total) * 100)
      : 0;

  const qualityText =
    dataQuality >= 90
      ? "Excellent"
      : dataQuality >= 75
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="card dark-panel">
      <div className="panel-header">
        <div>
          <h3>Business Insights</h3>
          <p>Key insights from your contact database</p>
        </div>
      </div>

      <div className="modern-grid">

        <div className="insight-box green-card">
          <div className="modern-icon">🏆</div>

          <h4>Top Company</h4>

          <h2>{topCompany[0]}</h2>

          <span>
            {topCompany[1]} contacts (
            {total > 0
              ? ((topCompany[1] / total) * 100).toFixed(1)
              : 0}
            %)
          </span>
        </div>

        <div className="insight-box purple-card">
          <div className="modern-icon">👥</div>

          <h4>Most Common Designation</h4>

          <h2>{topDesignation[0]}</h2>

          <span>
            {topDesignation[1]} contacts (
            {total > 0
              ? ((topDesignation[1] / total) * 100).toFixed(1)
              : 0}
            %)
          </span>
        </div>

        <div className="insight-box blue-card">
          <div className="modern-icon">✅</div>

          <h4>Complete Records</h4>

          <h2>{completeRecords}</h2>

          <span>
            {total > 0
              ? ((completeRecords / total) * 100).toFixed(1)
              : 0}
            % of total
          </span>
        </div>

        <div className="insight-box orange-card">
          <div className="modern-icon">⭐</div>

          <h4>Data Quality Score</h4>

          <h2>{dataQuality}%</h2>

          <span className="badge">
            {qualityText}
          </span>
        </div>

      </div>
    </div>
  );
}

export default BusinessInsights;