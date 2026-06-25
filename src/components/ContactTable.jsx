import { useState, useEffect } from "react";

function ContactTable({ contacts }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const filteredContacts = contacts.filter((contact) => {
    const keyword = search.toLowerCase();

    return (
      (contact.Name || "").toLowerCase().includes(keyword) ||
      (contact.Designation || "").toLowerCase().includes(keyword) ||
      (contact.Company || "").toLowerCase().includes(keyword)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / rowsPerPage)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredContacts.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const exportCSV = () => {
    const headers = [
      "Name",
      "Designation",
      "Company",
      "Email",
      "Phone No.",
    ];

    const rows = filteredContacts.map((contact) => [
      contact.Name,
      contact.Designation,
      contact.Company,
      contact.Email,
      contact["Phone No."],
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">

      <div className="table-header">
        <div>
          <h3>Contact Directory</h3>
          <p>Manage and explore business contacts</p>
        </div>

        <div className="table-actions">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="export-btn"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((contact, index) => (
              <tr key={index}>
                <td>{contact.Name || "-"}</td>
                <td>{contact.Designation || "-"}</td>
                <td>{contact.Company || "-"}</td>
                <td>{contact.Email || "-"}</td>
                <td>{contact["Phone No."] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}

export default ContactTable;