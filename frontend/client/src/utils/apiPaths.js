// Central place to manage all backend API endpoints
// This avoids hardcoding URLs across the app

export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",   // POST
    LOGIN: "/api/auth/login",          // POST
    PROFILE: "/api/auth/profile",      // GET (if implemented)
    UPDATE_PROFILE:"/api/auth/profile",
},

  BOOKS: {
    CREATE: "/api/books",              // POST
    GET_ALL: "/api/books",             // GET
    GET_BY_ID: (id) => `/api/books/${id}`, // GET
    UPDATE: (id) => `/api/books/${id}`,    // PUT
    DELETE: (id) => `/api/books/${id}`,    // DELETE
    UPDATE_COVER:"/api/books/cover",

},

  AI: {
    GENERATE_OUTLINE: "/api/ai/generate-outline",           // POST
    GENERATE_CHAPTER: "/api/ai/generate-chapter-content",   // POST
  },

  EXPORT: {
    DOCX: (id) => `/api/export/docx/${id}`, // GET
    PDF: (id) => `/api/export/pdf/${id}`,   // GET
  },
};
