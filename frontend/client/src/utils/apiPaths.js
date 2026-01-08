// Central place to manage all backend API endpoints

export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",   // POST
    LOGIN: "/api/auth/login",          // POST
    PROFILE: "/api/auth/profile",      // GET
    UPDATE_PROFILE: "/api/auth/profile",
  },

  BOOKS: {
    CREATE: "/api/books",                  // POST
    GET_ALL: "/api/books",                 // GET
    GET_BY_ID: (id) => `/api/books/${id}`, // GET
    UPDATE: (id) => `/api/books/${id}`,    // PUT
    DELETE: (id) => `/api/books/${id}`,    // DELETE

    // ✅ FIXED
    UPDATE_COVER: (id) => `/api/books/cover/${id}`,
  },

  AI: {
    GENERATE_OUTLINE: "/api/ai/generate-outline",          
    GENERATE_CHAPTER: "/api/ai/generate-chapter-content",
  },

  EXPORT: {
    DOCX: (id) => `/api/export/docx/${id}`,
    PDF: (id) => `/api/export/pdf/${id}`,
  },
};
