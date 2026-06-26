import { useState } from "react";
import CompanyModal from "./CompanyModal";

function AlphabetFilter({ contacts }) {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const companies = [
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
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="company-list">
        {companies.length === 0 ? (
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