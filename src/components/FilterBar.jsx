function FilterBar({
  contacts,
  search,
  setSearch,
  selectedCompany,
  setSelectedCompany,
  selectedDesignation,
  setSelectedDesignation,
}) {

  const companies = [
    ...new Set(
      contacts
        .map((contact) => contact.Company)
        .filter(Boolean)
    ),
  ].sort();

  const designations = [
    ...new Set(
      contacts
        .map((contact) => contact.Designation)
        .filter(Boolean)
    ),
  ].sort();

  const clearFilters = () => {
    setSearch("");
    setSelectedCompany("");
    setSelectedDesignation("");
  };

  return (
    <div className="filter-container">
      <div className="filters">

        <input
          type="text"
          placeholder="Search Contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCompany}
          onChange={(e) =>
            setSelectedCompany(e.target.value)
          }
        >
          <option value="">All Companies</option>

          {companies.map((company) => (
            <option
              key={company}
              value={company}
            >
              {company}
            </option>
          ))}
        </select>

        <select
          value={selectedDesignation}
          onChange={(e) =>
            setSelectedDesignation(e.target.value)
          }
        >
          <option value="">
            All Designations
          </option>

          {designations.map((designation) => (
            <option
              key={designation}
              value={designation}
            >
              {designation}
            </option>
          ))}
        </select>

        <button
          className="export-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>
    </div>
  );
}

export default FilterBar;