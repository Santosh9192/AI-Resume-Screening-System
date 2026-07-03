import axios from "axios";

const api = axios.create({
    baseURL:  "https://ai-resume-screening-system-qv6x.onrender.com",
});

export default api;