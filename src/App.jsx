import "./App.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import Header from "./components/Header";
import KPICards from "./components/KPICards";
import FilterBar from "./components/FilterBar";
import CompanyChart from "./components/CompanyChart";
import DesignationChart from "./components/DesignationChart";
import MissingFields from "./components/MissingFields";
import BusinessInsights from "./components/BusinessInsights";
// import ContactTable from "./components/ContactTable";
import AlphabetFilter from "./components/AlphabetFilter";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  useEffect(() => {
    Papa.parse("/Card_Data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const data = results.data.map((item) => ({
          Name: item.Name,
          Designation: item.Designation,
          Company: item["working/Company"],
          Email: item.Email,
          "Phone No.": item["Phone No."],
        }));

        setContacts(data);
      },
    });
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchSearch =
      search === "" ||
      contact.Name?.toLowerCase().includes(search.toLowerCase()) ||
      contact.Company?.toLowerCase().includes(search.toLowerCase()) ||
      contact.Designation?.toLowerCase().includes(search.toLowerCase());

    const matchCompany =
      selectedCompany === "" ||
      contact.Company === selectedCompany;

    const matchDesignation =
      selectedDesignation === "" ||
      contact.Designation === selectedDesignation;

    return (
      matchSearch &&
      matchCompany &&
      matchDesignation
    );
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="page-title">
        <h1>Card Data Management System</h1>
        <p>
          Manage and analyze business contacts extracted from visiting cards.
        </p>
      </div>

      <KPICards contacts={filteredContacts} />

      <FilterBar
        contacts={contacts}
        search={search}
        setSearch={setSearch}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
      />

      <div className="charts-grid">
        <CompanyChart contacts={filteredContacts} />
        <DesignationChart contacts={filteredContacts} />
      </div>

      <div className="analytics-grid">
        <MissingFields contacts={filteredContacts} />
        <BusinessInsights contacts={filteredContacts} />
      </div>

      {/* <ContactTable contacts={filteredContacts} /> */}
      <AlphabetFilter contacts={filteredContacts} />
    </div>
  );
}

export default App;