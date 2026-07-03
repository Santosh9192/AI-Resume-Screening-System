import re
from app.utils.skills import REQUIRED_SKILLS


def extract_skills(job_description: str):
    found_skills = []

    job_description = job_description.lower()

    for skill in REQUIRED_SKILLS:
        if re.search(r"\b" + re.escape(skill) + r"\b", job_description):
            found_skills.append(skill)

    return found_skills


def calculate_match(resume_text: str, required_skills: list):
    resume_text = resume_text.lower()

    matched_skills = []

    for skill in required_skills:
        if skill in resume_text:
            matched_skills.append(skill)

    score = 0

    if required_skills:
        score = round((len(matched_skills) / len(required_skills)) * 100)

    missing_skills = [
        skill for skill in required_skills
        if skill not in matched_skills
    ]

    return {
        "match_percentage": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }