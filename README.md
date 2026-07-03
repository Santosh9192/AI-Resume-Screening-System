# 🤖 AI Resume Screening System

An AI-powered Resume Screening System that helps candidates evaluate their resumes using ATS analysis and enables recruiters to efficiently screen, rank, and shortlist candidates.

---

## 🚀 Features

### 👨‍💼 Candidate Module

- User Registration & Login
- JWT Authentication
- Upload Resume (PDF)
- Role-Based ATS Analysis
- ATS Compatibility Score
- Skills Detection
- Missing Skills Detection
- AI Resume Feedback
- Resume History
- Download Resume
- Delete Resume

---

### 👩‍💼 Recruiter Module

- Recruiter Login
- Upload Job Description
- AI Candidate Ranking
- Candidate Analytics Dashboard
- Search Candidates
- Sort Candidates
- View Candidate Details
- Download Resume
- Delete Resume
- Shortlist Candidates
- Export Reports (PDF & Excel)

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Chart.js
- React Hot Toast

### Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- PyMuPDF
- Python

### Database

- SQLite (Development)
- PostgreSQL (Deployment Ready)

---

## 📂 Project Structure

```text
AI Resume Screening
│
├── backend
│   ├── app
│   ├── uploads
│   ├── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│
├── README.md
└── .gitignore
```

---

## 🔐 Authentication

- Secure JWT Authentication
- Password Hashing
- Role-Based Authorization

---

## 📊 AI Workflow

```
Candidate Upload Resume
        │
        ▼
Extract Resume Text
        │
        ▼
Select Target Job Role
        │
        ▼
Role-Based Skill Matching
        │
        ▼
ATS Score Calculation
        │
        ▼
AI Feedback Generation
```

---

## 📈 Recruiter Workflow

```
Recruiter Uploads Job Description
            │
            ▼
Extract JD Skills
            │
            ▼
Compare with Candidate Resumes
            │
            ▼
Rank Candidates
            │
            ▼
Shortlist Best Candidates
```

---

## ⚙️ Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Improvements

- Cloud Storage (AWS S3)
- Email Notifications
- AI Interview Questions
- Resume Versioning
- Semantic Resume Matching
- Interview Scheduling

---

## 👩‍💻 Developer

**Vrushali Rathod**

B.Tech – Computer Science & Engineering

Walchand Institute of Technology, Solapur

---

⭐ If you found this project useful, consider giving it a star!