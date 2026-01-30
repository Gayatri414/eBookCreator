// Central place to manage all backend API endpoints

export const BASE_URL = "https://ebookcreator-1.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile",
  },

  BOOKS: {
    CREATE: "/api/books",
    GET_ALL: "/api/books",
    GET_BY_ID: (id) => `/api/books/${id}`,
    UPDATE: (id) => `/api/books/${id}`,
    DELETE: (id) => `/api/books/${id}`,
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
