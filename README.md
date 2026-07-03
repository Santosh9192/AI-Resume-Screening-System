# 🤖 AI Resume Screening System

An AI-powered Resume Screening System designed to streamline the recruitment process by helping candidates analyze and improve their resumes using ATS (Applicant Tracking System) techniques while enabling recruiters to efficiently screen, rank, and shortlist candidates based on job requirements.

---

## 🚀 Features

### 👨‍💻 Candidate Module

- Secure User Registration & Login
- JWT-based Authentication
- Upload Resume (PDF)
- AI-Powered Resume Analysis
- ATS Compatibility Score
- Skills Detection
- Missing Skills Identification
- Personalized Resume Suggestions
- Resume History
- Download Resume
- Delete Resume

---

### 👨‍💼 Recruiter Module

- Recruiter Authentication
- Upload Job Description (PDF)
- AI-Based Candidate Ranking
- Candidate Analytics Dashboard
- Search & Filter Candidates
- Sort Candidates by Score
- View Candidate Details
- Download Candidate Resume
- Delete Candidate Resume
- Shortlist Candidates
- Export Reports (PDF & Excel)

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Chart.js

### Backend

- FastAPI
- SQLAlchemy
- Python
- JWT Authentication
- PyMuPDF
- PDFPlumber

### Database

- PostgreSQL (Production)
- SQLite (Development)

### Deployment

- Render (Backend)
- Supabase PostgreSQL
- GitHub

---

## 📂 Project Structure

```text
AI-Resume-Screening-System/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   ├── uploads/
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## 🔐 Authentication

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Secure Login System

---

## 🤖 Candidate Workflow

```text
Candidate Login
       │
       ▼
Upload Resume
       │
       ▼
Extract Resume Text
       │
       ▼
Select Job Role
       │
       ▼
Role-Based Skill Matching
       │
       ▼
ATS Score Calculation
       │
       ▼
AI Suggestions
```

---

## 👨‍💼 Recruiter Workflow

```text
Recruiter Login
       │
       ▼
Upload Job Description
       │
       ▼
Extract Required Skills
       │
       ▼
Compare with Candidate Resumes
       │
       ▼
Rank Candidates
       │
       ▼
Analytics Dashboard
       │
       ▼
Shortlist Best Candidates
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Santosh9192/AI-Resume-Screening-System.git
cd AI-Resume-Screening-System
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📊 Key Functionalities

- AI Resume Analysis
- ATS Compatibility Score
- Skill Extraction
- Missing Skill Detection
- Resume Ranking
- Candidate Shortlisting
- Job Description Matching
- Resume Management
- Recruiter Dashboard
- PDF & Excel Report Export

---

## 🚀 Future Enhancements

- AI Interview Question Generator
- Resume Version History
- Semantic Resume Matching
- Email Notifications
- Cloud File Storage (AWS S3)
- Interview Scheduling
- Admin Dashboard
- Multi-Language Resume Support

---

## 📸 Project Screenshots

Project screenshots are available in the **Screenshots/** folder.

---

## 👨‍💻 Developer

**Santosh Babar**

Linkedin: www.linkedin.com/in/santosh-babar-839767407

GitHub: https://github.com/Santosh9192

---

## ⭐ Support

If you found this project helpful, consider giving this repository a **⭐ Star**.

It helps others discover the project and motivates further development.

---

## 📄 License

This project is developed for educational and portfolio purposes.