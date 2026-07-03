import re

from app.utils.role_skills import ROLE_SKILLS


def analyze_resume(text: str, role: str = "Python Developer"):

    # Normalize text
    text = re.sub(r"\s+", " ", text.lower())

    # Get role-specific skills
    required_skills = ROLE_SKILLS.get(role, ROLE_SKILLS["Python Developer"])

    found_skills = []

    missing_skills = []

    for skill in required_skills:

        if skill.lower() in text:

            found_skills.append(skill)

        else:

            missing_skills.append(skill)

    score = round(

        (len(found_skills) / len(required_skills)) * 100

    )

    # ==========================================
    # AI Recommendation
    # ==========================================

    if score >= 80:

        recommendation = "Excellent ATS Match"

    elif score >= 60:

        recommendation = "Good ATS Match"

    elif score >= 40:

        recommendation = "Average ATS Match"

    else:

        recommendation = "Needs Improvement"

    # ==========================================
    # AI Feedback
    # ==========================================

    feedback = []

    if len(found_skills) > 0:

        feedback.append(

            f"Strong skills detected in {', '.join(found_skills[:5])}."

        )

    if len(missing_skills) > 0:

        feedback.append(

            f"Consider adding {', '.join(missing_skills[:5])}."

        )

    if score >= 80:

        feedback.append(

            "Your resume is highly ATS friendly for this role."

        )

    elif score >= 60:

        feedback.append(

            "Your resume is good but can be improved with additional role-specific skills."

        )

    else:

        feedback.append(

            "Improve your resume by adding projects, certifications and role-specific keywords."

        )

    return {

        "score": score,

        "recommendation": recommendation,

        "skills_found": found_skills,

        "missing_skills": missing_skills,

        "feedback": feedback

    }