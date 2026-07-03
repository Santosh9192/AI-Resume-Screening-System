from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    candidate_name = Column(String)
    file_name = Column(String)
    extracted_text = Column(String)

    shortlisted = Column(Boolean, default=False)