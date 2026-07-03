from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from fastapi import UploadFile, File
import os

import os

from fastapi.responses import FileResponse

from app.services.job_description_parser import extract_job_description

from app.db.database import get_db
from app.models.resume import Resume
from app.core.dependencies import recruiter_required
from app.services.resume_analyzer import analyze_resume
from app.services.job_matcher import (
    extract_skills,
    calculate_match
)
from app.services.tfidf_matcher import (
    calculate_similarity,
    get_recommendation
)
from app.schemas.user import JobDescriptionRequest

from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/recruiter",
    tags=["Recruiter"]
)

@router.get("/candidates")
def get_all_candidates(
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    resumes = db.query(Resume).all()

    result = []

    for resume in resumes:
        analysis = analyze_resume(resume.extracted_text)

        result.append({
            "resume_id": resume.id,
            "candidate_name": resume.candidate_name,
            "file_name": resume.file_name,
            "score": analysis["score"],
            "skills_found": analysis["skills_found"],
            "missing_skills": analysis["missing_skills"]
        })
    result.sort(key=lambda x: x["score"], reverse=True)
    return result

@router.get("/search")
def search_candidates(
    skill: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    resumes = db.query(Resume).all()

    result = []

    for resume in resumes:
        analysis = analyze_resume(resume.extracted_text)

        # Check if the searched skill is found
        if skill.lower() in [s.lower() for s in analysis["skills_found"]]:
            result.append({
                "resume_id": resume.id,
                "candidate_name": resume.candidate_name,
                "file_name": resume.file_name,
                "score": analysis["score"],
                "skills_found": analysis["skills_found"],
                "missing_skills": analysis["missing_skills"]
            })

    return result

@router.get("/candidate/{resume_id}")
def get_candidate_details(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    analysis = analyze_resume(resume.extracted_text)

    return {
        "resume_id": resume.id,
        "candidate_name": resume.candidate_name,
        "file_name": resume.file_name,
        "extracted_text": resume.extracted_text,
        "score": analysis["score"],
        "skills_found": analysis["skills_found"],
        "missing_skills": analysis["missing_skills"]
    }

@router.post("/shortlist/{resume_id}")
def shortlist_candidate(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    resume.shortlisted = True

    db.commit()
    db.refresh(resume)

    return {
        "message": "Candidate shortlisted successfully",
        "resume_id": resume.id,
        "candidate_name": resume.candidate_name,
        "shortlisted": resume.shortlisted
    }

@router.get("/shortlisted")
def get_shortlisted_candidates(
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    resumes = db.query(Resume).filter(Resume.shortlisted == True).all()

    result = []

    for resume in resumes:
        analysis = analyze_resume(resume.extracted_text)

        result.append({
            "resume_id": resume.id,
            "candidate_name": resume.candidate_name,
            "file_name": resume.file_name,
            "score": analysis["score"],
            "skills_found": analysis["skills_found"],
            "missing_skills": analysis["missing_skills"],
            "shortlisted": resume.shortlisted
        })

    result.sort(key=lambda x: x["score"], reverse=True)

    return result

@router.post("/job-match")
def match_job_description(
    request: JobDescriptionRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    required_skills = extract_skills(request.job_description)

    resumes = db.query(Resume).all()

    results = []

    for resume in resumes:

        match = calculate_match(
            resume.extracted_text,
            required_skills
        )

        results.append({
            "resume_id": resume.id,
            "candidate_name": resume.candidate_name,
            "file_name": resume.file_name,
            "match_percentage": match["match_percentage"],
            "matched_skills": match["matched_skills"],
            "missing_skills": match["missing_skills"]
        })

    results.sort(
        key=lambda x: x["match_percentage"],
        reverse=True
    )

    return results

@router.post("/job-match-ai")
def ai_job_match(
    request: JobDescriptionRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):
    required_skills = extract_skills(request.job_description)

    resumes = db.query(Resume).all()

    results = []

    for resume in resumes:

        similarity = calculate_similarity(
            request.job_description,
            resume.extracted_text
        )

        skill_analysis = calculate_match(
            resume.extracted_text,
            required_skills
        )

        results.append({
            "resume_id": resume.id,
            "candidate_name": resume.candidate_name,
            "file_name": resume.file_name,
            "ai_match_percentage": similarity,
            "recommendation": get_recommendation(similarity),
            "matched_skills": skill_analysis["matched_skills"],
            "missing_skills": skill_analysis["missing_skills"]
        })

    results.sort(
        key=lambda x: x["ai_match_percentage"],
        reverse=True
    )

    return results

@router.post("/upload-job-description")
def upload_job_description(
    file: UploadFile = File(...),
    current_user: dict = Depends(recruiter_required)
):
    os.makedirs("job_descriptions", exist_ok=True)

    file_path = f"job_descriptions/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    extracted_text = extract_job_description(file_path)

    return {
        "message": "Job Description uploaded successfully",
        "file_name": file.filename,
        "job_description": extracted_text
    }

@router.post("/upload-job-description-ai")
def upload_job_description_ai(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):

    os.makedirs("job_descriptions", exist_ok=True)

    file_path = f"job_descriptions/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Extract JD text
    job_description = extract_job_description(file_path)

    # Extract required skills
    required_skills = extract_skills(job_description)

    resumes = db.query(Resume).all()

    results = []

    for resume in resumes:

        # TF-IDF similarity
        similarity = calculate_similarity(
            job_description,
            resume.extracted_text
        )

        # Keyword Matching
        skill_analysis = calculate_match(
            resume.extracted_text,
            required_skills
        )

        recommendation = get_recommendation(similarity)

        suggested_shortlist = similarity >= 85

        results.append({

            "resume_id": resume.id,

            "candidate_name": resume.candidate_name,

            "file_name": resume.file_name,

            "ai_match_percentage": similarity,

            "recommendation": recommendation,

            "matched_skills": skill_analysis["matched_skills"],

            "missing_skills": skill_analysis["missing_skills"],

            "suggested_shortlist": suggested_shortlist

        })

    results.sort(
        key=lambda x: x["ai_match_percentage"],
        reverse=True
    )

    return {
        "job_description": job_description,
        "total_candidates": len(results),
        "candidates": results
    }

@router.get("/download-resume/{resume_id}")
def download_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(recruiter_required)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    file_path = os.path.join(
        "uploads",
        resume.file_name
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Resume file not found"
        )

    return FileResponse(
        path=file_path,
        filename=resume.file_name,
        media_type="application/pdf"
    )
# =====================================================
# Download Candidate Resume
# =====================================================

@router.get("/download-resume/{resume_id}")
def download_resume(

    resume_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(recruiter_required)

):

    resume = db.query(Resume).filter(

        Resume.id == resume_id

    ).first()

    if not resume:

        raise HTTPException(

            status_code=404,

            detail="Resume not found."

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
# Delete Resume (Recruiter)
# =====================================================

from fastapi import HTTPException
from fastapi.responses import FileResponse
import os

@router.delete("/delete-resume/{resume_id}")
def delete_resume(

    resume_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(recruiter_required)

):

    resume = db.query(Resume).filter(

        Resume.id == resume_id

    ).first()

    if not resume:

        raise HTTPException(

            status_code=404,

            detail="Resume not found."

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

        "message": "Resume deleted successfully."

    }