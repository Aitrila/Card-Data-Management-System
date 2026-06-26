import { useState } from "react";
import CompanyModal from "./CompanyModal";

function AlphabetFilter({ contacts }) {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  const visibleCompanies = showAll
    ? companies
    : companies.slice(0, 8);

  return (
    <div className="card">

      <h3>Company Contacts</h3>

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
              setShowAll(false);
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {selectedLetter === "" ? (

        <div className="select-letter">
          Press these letters..
        </div>

      ) : companies.length === 0 ? (

        <p>No company found.</p>

      ) : (

        <>
          <div className="company-list">

            {visibleCompanies.map((company, index) => (
              <div
                key={index}
                className="company-card"
                onClick={() =>
                  setSelectedCompany(company)
                }
              >
                {company}
              </div>
            ))}

          </div>

          {companies.length > 8 && !showAll && (
            <button
              className="view-more-btn"
              onClick={() => setShowAll(true)}
            >
              View More
            </button>
          )}

          {companies.length > 8 && showAll && (
            <button
              className="view-more-btn"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
        </>
      )}

      <CompanyModal
        company={selectedCompany}
        contacts={contacts}
        onClose={() => setSelectedCompany(null)}
      />

    </div>
  );
}

export default AlphabetFilter;