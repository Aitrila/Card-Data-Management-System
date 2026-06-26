import { useState, useEffect } from "react";

function CompanyModal({
  company,
  contacts,
  onClose,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  useEffect(() => {
    setSearch("");
    setCurrentPage(1);
  }, [company]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (!company) return null;

  const companyContacts = contacts.filter((contact) => {
    const sameCompany =
      (contact.Company || "").trim().toLowerCase() ===
      (company || "").trim().toLowerCase();

    const matchesSearch =
      (contact.Name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (contact.Designation || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    return sameCompany && matchesSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(companyContacts.length / rowsPerPage)
  );

  const currentRows = companyContacts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <div>
         <h2>{company}</h2>

        <span className="contact-badge">
       👥 Total Contacts : {companyContacts.length}
      </span>
      </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <input
          className="modal-search"
          placeholder="Search Name or Designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="modal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.Name || "-"}</td>
                  <td>{contact.Designation || "-"}</td>
                  <td>{contact.Email || "-"}</td>
                  <td>{contact["Phone No."] || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            ◀ Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next ▶
          </button>
        </div>

      </div>
    </div>
  );
}

export default CompanyModal;