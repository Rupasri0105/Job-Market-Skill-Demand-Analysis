import { useState } from "react";

export default function Database() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const CodeBlock = ({ code, idx, lang = "bash" }) => (
    <div style={{ position: "relative" }}>
      <div className="code-block" style={{ whiteSpace: "pre", overflowX: "auto" }}>
        {code}
      </div>
      <button
        onClick={() => copy(code, idx)}
        style={{
          position: "absolute", top: 8, right: 8,
          background: "var(--surface2)", border: "1px solid var(--border)",
          color: copiedIndex === idx ? "var(--accent3)" : "var(--text-muted)",
          padding: "4px 10px", borderRadius: 6, cursor: "pointer",
          fontSize: 11, fontFamily: "var(--mono)",
        }}
      >
        {copiedIndex === idx ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );

  const schema = `// MongoDB Schema — models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle:        { type: String, required: true },
  company:         { type: String },
  skillLevel:      { type: String },
  experience:      { type: String },
  educationDegree: { type: String },
  industry:        { type: String },
  jobFunction:     { type: String },
  jobLocation:     { type: String },
  salary:          { type: String },
  jobDescription:  { type: String },
  qualification:   { type: String },
  keywords:        [{ type: String }],   // RAKE extracted
  source:          { type: String },     // 'jobthai' | 'jobsdb'
  scrapedAt:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);`;

  const backendSetup = `# 1. Create project folder
mkdir skillmap-backend && cd skillmap-backend

# 2. Initialize Node.js project
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv

# 4. Create folder structure
mkdir models routes controllers`;

  const serverCode = `// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/jobs', require('./routes/jobs'));

app.listen(5000, () => console.log('Server on port 5000'));`;

  const jobsRoute = `// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().limit(100);
  res.json(jobs);
});

// GET jobs by function
router.get('/function/:fn', async (req, res) => {
  const jobs = await Job.find({ jobFunction: req.params.fn });
  res.json(jobs);
});

// GET keyword stats
router.get('/keywords/stats', async (req, res) => {
  const stats = await Job.aggregate([
    { $unwind: '$keywords' },
    { $group: { _id: '$keywords', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 50 }
  ]);
  res.json(stats);
});

module.exports = router;`;

  const reactSetup = `# 1. Create React app (in separate folder)
cd ..
npm create vite@latest skillmap-frontend -- --template react

# 2. Install dependencies
cd skillmap-frontend
npm install axios recharts

# 3. Run dev server
npm run dev`;

  const envFile = `# .env file (in backend folder)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillmap
PORT=5000`;

  const gitCommands = `# Initialize git in your project root
git init

# Create .gitignore
echo "node_modules/
.env
dist/" > .gitignore

# Stage and commit
git add .
git commit -m "Initial commit: SkillMap Dashboard"

# Link to GitHub (create repo on github.com first)
git remote add origin https://github.com/YOUR_USERNAME/skillmap.git
git branch -M main
git push -u origin main`;

  return (
    <div>
      <div className="page-header">
        <span className="page-tag">Setup Guide</span>
        <h1 className="page-title">Full Stack Setup<br />MongoDB · Node · React · GitHub</h1>
        <p className="page-subtitle">
          Complete step-by-step guide for VS Code beginners. Follow each step in order.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="section">
        <div className="section-title">Step 0 — Install These First</div>
        <div className="grid-3">
          {[
            { name: "Node.js", url: "nodejs.org", desc: "Download LTS version. Includes npm.", tag: "Required" },
            { name: "VS Code", url: "code.visualstudio.com", desc: "Free code editor by Microsoft.", tag: "Required" },
            { name: "MongoDB Atlas", url: "mongodb.com/atlas", desc: "Free cloud database. Create a free cluster.", tag: "Required" },
            { name: "Git", url: "git-scm.com", desc: "Version control. Needed for GitHub.", tag: "Required" },
            { name: "GitHub Account", url: "github.com", desc: "Create a free account to host your code.", tag: "Required" },
            { name: "Postman", url: "postman.com", desc: "Optional — test your API endpoints.", tag: "Optional" },
          ].map((t) => (
            <div key={t.name} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{t.name}</span>
                <span className={`tag ${t.tag === "Required" ? "tag-blue" : "tag-amber"}`}>{t.tag}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{t.desc}</p>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>{t.url}</span>
            </div>
          ))}
        </div>
      </div>

      {/* VS Code Extensions */}
      <div className="section">
        <div className="section-title">Step 1 — VS Code Extensions to Install</div>
        <div className="card">
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
            In VS Code, press <kbd style={{ background: "var(--surface2)", padding: "2px 6px", borderRadius: 4, fontFamily: "var(--mono)", fontSize: 11 }}>Ctrl+Shift+X</kbd> and search for each:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["ESLint", "Prettier", "MongoDB for VS Code", "REST Client", "GitLens", "ES7+ React Snippets"].map(ext => (
              <span key={ext} className="tag tag-purple">{ext}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Backend */}
      <div className="section">
        <div className="section-title">Step 2 — Create Node.js Backend</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <div className="card-label" style={{ marginBottom: 10 }}>Terminal commands (open terminal in VS Code with Ctrl+`)</div>
            <CodeBlock code={backendSetup} idx={0} />
          </div>
          <div className="card">
            <div className="card-label" style={{ marginBottom: 10 }}>.env file — paste your MongoDB URI here</div>
            <CodeBlock code={envFile} idx={1} />
          </div>
          <div className="card">
            <div className="card-label" style={{ marginBottom: 10 }}>server.js — main entry point</div>
            <CodeBlock code={serverCode} idx={2} />
          </div>
        </div>
      </div>

      {/* MongoDB Schema */}
      <div className="section">
        <div className="section-title">Step 3 — MongoDB Schema (models/Job.js)</div>
        <div className="card">
          <div className="card-label" style={{ marginBottom: 10 }}>Mongoose schema matching the paper's 11 attributes + RAKE keywords</div>
          <CodeBlock code={schema} idx={3} />
        </div>
      </div>

      {/* API Routes */}
      <div className="section">
        <div className="section-title">Step 4 — API Routes (routes/jobs.js)</div>
        <div className="card">
          <CodeBlock code={jobsRoute} idx={4} />
        </div>
      </div>

      {/* React Frontend */}
      <div className="section">
        <div className="section-title">Step 5 — Create React Frontend</div>
        <div className="card">
          <div className="card-label" style={{ marginBottom: 10 }}>Run in a new terminal window</div>
          <CodeBlock code={reactSetup} idx={5} />
          <div style={{ marginTop: 16, padding: 12, background: "var(--surface2)", borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
              📁 Your folder structure should look like:<br />
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>
                skillmap/<br />
                ├── skillmap-backend/ (Node + Express)<br />
                └── skillmap-frontend/ (React + Vite)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* GitHub */}
      <div className="section">
        <div className="section-title">Step 6 — Push to GitHub</div>
        <div className="card">
          <div className="card-label" style={{ marginBottom: 10 }}>
            First: create a new repo at github.com (click the + button), then run:
          </div>
          <CodeBlock code={gitCommands} idx={6} />
          <div style={{ marginTop: 16 }}>
            <div className="card-label">⚠️ Important: Never push .env to GitHub</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
              The .gitignore file above already excludes it. Your MongoDB password stays safe.
            </p>
          </div>
        </div>
      </div>

      {/* Run the app */}
      <div className="section">
        <div className="section-title">Step 7 — Run the Full App</div>
        <div className="grid-2">
          <div className="card" style={{ borderLeft: "3px solid var(--accent)" }}>
            <div className="card-label">Terminal 1 — Backend</div>
            <div className="code-block" style={{ marginTop: 10 }}>
              cd skillmap-backend{"\n"}node server.js{"\n"}{"\n"}# → Server on port 5000
            </div>
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--accent2)" }}>
            <div className="card-label">Terminal 2 — Frontend</div>
            <div className="code-block" style={{ marginTop: 10 }}>
              cd skillmap-frontend{"\n"}npm run dev{"\n"}{"\n"}# → http://localhost:5173
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: 16, background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>You're done!</div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Open VS Code, open the terminal (Ctrl+`), and follow the steps above in order. 
                If you get stuck on any step, Google the exact error message — it almost always leads straight to the answer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
