from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

import os
import fitz

from app.db.database import get_db
from app.models.resume import Resume
from app.core.dependencies import get_current_user
from app.services.resume_analyzer import analyze_resume

router = APIRouter()


# =====================================================
# Health API
# =====================================================

@router.get("/health")
def health_check():

    return {

        "status": "healthy"

    }


# =====================================================
# Upload Resume
# =====================================================

@router.post("/upload-resume")
def upload_resume(

    candidate_name: str = Form(...),

    target_role: str = Form(...),

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: dict = Depends(get_current_user)

):

    # Validate PDF

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(

            status_code=400,

            detail="Only PDF files are allowed."

        )

    # Create uploads folder

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join(

        "uploads",

        file.filename

    )

    # Save uploaded file

    with open(file_path, "wb") as buffer:

        buffer.write(file.file.read())

    # -------------------------
    # Extract Resume Text
    # -------------------------

    extracted_text = ""

    try:

        doc = fitz.open(file_path)

        for page in doc:

            extracted_text += page.get_text("text") + "\n"

        doc.close()

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=f"PDF Extraction Error : {str(e)}"

        )

    print("====================================")
    print(extracted_text[:3000])
    print("====================================")

    # -------------------------
    # AI Resume Analysis
    # -------------------------

    analysis = analyze_resume(

    extracted_text,

    target_role

)
        # -------------------------
    # Save Resume to Database
    # -------------------------

    resume = Resume(

        candidate_name=candidate_name,

        file_name=file.filename,

        extracted_text=extracted_text

    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return {

        "message": "Resume uploaded successfully",

        "resume_id": resume.id,

        "candidate_name": resume.candidate_name,

        "file_name": resume.file_name,

        "target_role": target_role, 
        
        "score": analysis["score"],

        "skills_found": analysis["skills_found"],

        "missing_skills": analysis["missing_skills"]

    }


# =====================================================
# Candidate Resume History
# =====================================================

@router.get("/candidate/history")
def candidate_resume_history(

    db: Session = Depends(get_db),

    current_user: dict = Depends(get_current_user)

):

    candidate_name = current_user.get("email")

    resumes = (

        db.query(Resume)

        .filter(Resume.candidate_name == candidate_name)

        .order_by(Resume.id.desc())

        .all()

    )

    history = []

    for resume in resumes:

        analysis = analyze_resume(

            resume.extracted_text

        )

        history.append({

            "resume_id": resume.id,

            "candidate_name": resume.candidate_name,

            "file_name": resume.file_name,

            "score": analysis["score"],

            "skills_found": analysis["skills_found"],

            "missing_skills": analysis["missing_skills"],

            "shortlisted": resume.shortlisted

        })

    return {

        "total_resumes": len(history),

        "history": history

    }
    # =====================================================
# Download Candidate Resume
# =====================================================

@router.get("/candidate/download/{resume_id}")
def download_candidate_resume(

    resume_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(get_current_user)

):

    resume = db.query(Resume).filter(

        Resume.id == resume_id

    ).first()

    if not resume:

        raise HTTPException(

            status_code=404,

            detail="Resume not found."

        )

    if resume.candidate_name != current_user.get("email"):

        raise HTTPException(

            status_code=403,

            detail="Access denied."

        )

    file_path = os.path.join(

        "uploads",

        resume.file_name

    )

    if not os.path.exists(file_path):

        raise HTTPException(

            status_code=404,

            detail="Resume file not found."

        )

    return FileResponse(

        path=file_path,

        filename=resume.file_name,

        media_type="application/pdf"

    )


# =====================================================
# Delete Candidate Resume
# =====================================================

@router.delete("/candidate/delete/{resume_id}")
def delete_candidate_resume(

    resume_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(get_current_user)

):

    resume = db.query(Resume).filter(

        Resume.id == resume_id

    ).first()

    if not resume:

        raise HTTPException(

            status_code=404,

            detail="Resume not found."

        )

    if resume.candidate_name != current_user.get("email"):

        raise HTTPException(

            status_code=403,

            detail="Access denied."

        )

    file_path = os.path.join(

        "uploads",

        resume.file_name

    )

    if os.path.exists(file_path):

        os.remove(file_path)

    db.delete(resume)

    db.commit()

    return {

        "message": "Resume deleted successfully.",

        "resume_id": resume_id

    }