export default function Methodology() {
  const pipeline = [
    { icon: "🌐", name: "Web Scraping", tool: "Scrapy + BS4" },
    { icon: "🗄️", name: "Store Data", tool: "MySQL + Pymysql" },
    { icon: "🔑", name: "Keywords", tool: "RAKE-nltk" },
    { icon: "🧹", name: "Clean Data", tool: "Standardize" },
    { icon: "📊", name: "Visualize", tool: "Power BI" },
  ];

  const steps = [
    {
      title: "Send HTTP Request",
      desc: "Send request to the target job URL and receive an HTML DOM response variable.",
    },
    {
      title: "Parse HTML",
      desc: "Parse the HTML variable using BeautifulSoup or Scrapy library into structured format.",
    },
    {
      title: "Extract Required Fields",
      desc: "Scrape: job title, company, skill level, experience, education, industry, job function, location, salary, description, qualification.",
    },
    {
      title: "Save to Database",
      desc: "Store each job record into MySQL database using Pymysql. Auto-triggered once per month.",
    },
    {
      title: "RAKE Keyword Extraction",
      desc: "Split text with stop words → build co-occurrence graph → compute degree/frequency scores → select top T keywords.",
    },
    {
      title: "Visualize",
      desc: "Query MySQL via Power BI. Create treemaps (job demand by category) and word clouds (skills per job function).",
    },
  ];

  const attributes = [
    "Job Title", "Company", "Skill Level", "Required Experience",
    "Education Degree", "Industry", "Job Function", "Job Location",
    "Salary", "Job Description", "Qualification",
  ];

  const algorithms = [
    { name: "Hulth", status: "Considered", note: "Linguistic knowledge-based", active: false },
    { name: "TextRank", status: "Considered", note: "Graph-based ranking", active: false },
    { name: "RAKE", status: "Selected", note: "Best performance, unsupervised", active: true },
  ];

  return (
    <div>
      <div className="page-header">
        <span className="page-tag">Methodology</span>
        <h1 className="page-title">Data Collection &amp;<br />Processing Pipeline</h1>
        <p className="page-subtitle">
          End-to-end automated pipeline from web scraping to keyword visualization.
        </p>
      </div>

      <div className="section">
        <div className="section-title">Processing Pipeline</div>
        <div className="card">
          <div className="pipeline">
            {pipeline.map((p, i) => (
              <div key={i} className="pipe-step">
                <div className="pipe-icon">{p.icon}</div>
                <div className="pipe-name">{p.name}</div>
                <div className="pipe-tool">{p.tool}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="grid-2">
          <div>
            <div className="section-title">Web Scraping Steps</div>
            <div className="card">
              <div className="steps">
                {steps.map((s, i) => (
                  <div key={i} className="step">
                    <div className="step-line">
                      <div className="step-num">{i + 1}</div>
                      {i < steps.length - 1 && <div className="step-connector" />}
                    </div>
                    <div className="step-content">
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="section-title">Database Schema (11 Attributes)</div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {attributes.map((a, i) => (
                  <span key={i} className={`tag ${i < 3 ? "tag-amber" : i < 8 ? "tag-blue" : "tag-purple"}`}>
                    {a}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--text)" }}>Atomic fields:</strong> Job Title, Company, Salary<br />
                <strong style={{ color: "var(--text)" }}>Descriptive fields:</strong> Job Function, Description, Qualification
              </div>
            </div>

            <div className="section-title">Keyword Extraction Algorithm</div>
            <div className="card">
              {algorithms.map((a) => (
                <div
                  key={a.name}
                  style={{
                    padding: "12px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    background: a.active ? "rgba(0,212,255,0.06)" : "var(--surface2)",
                    border: a.active ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, color: a.active ? "var(--accent)" : "var(--text)" }}>
                      {a.name}
                    </span>
                    <span
                      className="tag"
                      style={{
                        background: a.active ? "rgba(16,185,129,0.1)" : "transparent",
                        color: a.active ? "var(--accent3)" : "var(--text-muted)",
                        border: a.active ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border)",
                        fontFamily: "var(--mono)", fontSize: 10, padding: "2px 8px", borderRadius: 20,
                      }}
                    >
                      {a.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{a.note}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: 12, background: "var(--surface2)", borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text-muted)", lineHeight: 1.8 }}>
                  <span style={{ color: "var(--accent)" }}>T</span> = number of top keywords<br />
                  <span style={{ color: "var(--accent)" }}>T</span> = ⅓ × (words in co-occurrence graph)<br />
                  Score = sum of member word degree/frequency ratios
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
