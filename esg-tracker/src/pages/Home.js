import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CompanyCard from "../components/CompanyCard";
import ESGDefinitionCards from "../components/ESGDefinitionCards";
import Sidebar from "../components/Sidebar";
import LogoImage from "../images/Logo.png";
import "font-awesome/css/font-awesome.min.css";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = window.innerWidth < 768;

  const fetchCompaniesData = useCallback(async () => {
    // List of tickers to include
    const allowedTickers = [
      "OTEX.TO",
      "KXS.TO",
      "DSG.TO",
      "CSU.TO",
      "SHOP.TO",
      "LSPD.TO",
      "DCBO.TO",
      "ENGH.TO",
      "HAI.TO",
      "TIXT.TO",
      "ET.TO",
      "BLN.TO",
      "DND.TO",
      "TSAT.TO",
      "ALYA.TO",
      "ACX.TO",
      "AKT-A.TO",
      "ATH.TO",
      "BTE.TO",
      "BIR.TO",
      "CNE.TO",
      "CJ.TO",
      "FRU.TO",
      "FEC.TO",
      "GFR.TO",
      "IPCO.TO",
      "JOY.TO",
      "KEC.TO",
      "MEG.TO",
      "NVA.TO",
      "BR.TO",
      "TPX-A.TO",
      "LAS-A.TO",
      "SOY.TO",
      "ADW-A.TO",
      "CSW-B.TO",
      "RSI.TO",
      "EMP-A.TO",
      "DOL.TO",
      "WN-PA.TO",
      "BU.TO",
      "DTEA.V",
      "HLF.TO",
      "JWEL.TO",
      "MFI.TO",
    ];

    try {
      // Fetch basic company info
      const { data: companiesData, error: companiesError } = await supabase
        .from("companies")
        .select("ticker, name, sector, long_business_summary")
        .in("ticker", allowedTickers);

      if (companiesError) {
        console.error("Error fetching companies:", companiesError);
      }

      // Fetch final ESG scores for allowed tickers
      const { data: esgData, error: esgError } = await supabase
        .from("final_esg_scores")
        .select(
          "ticker, environmental_score, social_score, governance_score, total_esg_score"
        )
        .in("ticker", allowedTickers);

      if (esgError) {
        console.error("Error fetching ESG scores:", esgError);
      }

      // Merge companies with ESG scores by matching ticker
      const combined = (companiesData || []).map((comp) => {
        const matchingESG = (esgData || []).find(
          (esg) => esg.ticker === comp.ticker
        );
        return {
          ...comp,
          environmental_score: matchingESG?.environmental_score ?? 0,
          social_score: matchingESG?.social_score ?? 0,
          governance_score: matchingESG?.governance_score ?? 0,
          total_esg_score: matchingESG?.total_esg_score ?? 0,
        };
      });
      setCompanies(combined);
    } catch (err) {
      console.error("Error in fetchCompaniesData:", err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompaniesData();
  }, [fetchCompaniesData]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1B1D1E",
        }}
      >
        <img
          src={LogoImage}
          alt="Loading…"
          className="spinner"
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }
  

  // Filter companies by name based on the search term
  const filteredCompanies = companies.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered companies by sector
  const groupedBySector = {};
  filteredCompanies.forEach((company) => {
    const sec = company.sector || "Unknown";
    if (!groupedBySector[sec]) {
      groupedBySector[sec] = [];
    }
    groupedBySector[sec].push(company);
  });

  return (
    <div style={{
      display: "flex",
      backgroundColor: "#1B1D1E",
      minHeight: "100vh",
      color: "#fff"
    }}>
      <Sidebar />
  
      <div style={{
        flex: 1,
        width: "100%",
        maxWidth: "80vw",
        margin: "0 auto",
        padding: "1rem",
        paddingTop: isMobile ? "6rem" : "1rem"
      }}>

        
        <ESGDefinitionCards />

        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <i
            className="fa fa-search"
            style={{
              position: "absolute",
              top: "50%",
              left: "1rem",
              transform: "translateY(-50%)",
              color: "#AAAAAD",
              fontSize: "16px",
            }}
          ></i>
          <input
            className="searchInput"
            type="text"
            placeholder="Search company"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: isMobile ? "100%" : "73.3rem",
              padding: "1rem 1rem 1rem 2.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#232526",
              color: "#fff",
              fontSize: "17px",
            }}
          />
        </div>

        {/* Render sectors with their companies */}
        {Object.entries(groupedBySector).map(([sectorName, comps]) => (
        <div
          id={
            sectorName.toLowerCase().includes("consumer")
              ? "Consumer"
              : sectorName.replace(/\s+/g, "")
          }
          key={sectorName}
          style={{ marginBottom: "2rem" }}
        >
            <h2 style={{ fontSize: "18px", marginBottom: "1rem" }}>
              Sector: {sectorName}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1rem",
                alignItems: "stretch",
              }}
            >
              {comps.map((company) => (
                <Link
                  key={company.ticker}
                  to={`/company/${company.ticker}`}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <CompanyCard
                    name={company.name || "Not available"}
                    summary={company.long_business_summary || "Not available"}
                    esgTotal={company.total_esg_score}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;