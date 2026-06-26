import { useState } from "react";
import CompanyModal from "./CompanyModal";

function AlphabetFilter({ contacts }) {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanies, setShowCompanies] = useState(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const companies =
    selectedLetter === ""
      ? []
      : [
          ...new Set(
            contacts
              .filter(
                (contact) =>
                  contact.Company &&
                  contact.Company
                    .toUpperCase()
                    .startsWith(selectedLetter)
              )
              .map((contact) => contact.Company)
          ),
        ].sort();

  return (
    <div className="card">

      <div className="company-header">

        <h3>Company Contacts</h3>

        <button
          className="view-company-btn"
          disabled={!selectedLetter}
          onClick={() =>
            setShowCompanies(!showCompanies)
          }
        >
          {showCompanies
            ? "Hide Companies"
            : "View Companies"}
        </button>

      </div>

      <div className="alphabet-container">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={
              selectedLetter === letter
                ? "alphabet-btn active"
                : "alphabet-btn"
            }
            onClick={() => {
              setSelectedLetter(letter);
              setSelectedCompany(null);
              setShowCompanies(false);
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="company-list">

        {!selectedLetter ? (

          <div className="select-letter">
            Select an alphabet first.
          </div>

        ) : !showCompanies ? (

          <div className="select-letter">
            {/* Click "View Companies" to display the company list. */}
          </div>

        ) : companies.length === 0 ? (

          <p>No company found.</p>

        ) : (

          companies.map((company, index) => (
            <div
              key={index}
              className="company-card"
              onClick={() => setSelectedCompany(company)}
            >
              {company}
            </div>
          ))

        )}

      </div>

      <CompanyModal
        company={selectedCompany}
        contacts={contacts}
        onClose={() => setSelectedCompany(null)}
      />

    </div>
  );
}

export default AlphabetFilter;