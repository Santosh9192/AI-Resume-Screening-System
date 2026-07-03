from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(job_description: str, resume_text: str):

    documents = [
        job_description,
        resume_text
    ]

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )

    percentage = round(float(similarity[0][0]) * 100, 2)

    return percentage

def get_recommendation(score: float):

    if score >= 85:
        return "Strong Match"

    elif score >= 70:
        return "Good Match"

    elif score >= 50:
        return "Average Match"

    else:
        return "Weak Match"