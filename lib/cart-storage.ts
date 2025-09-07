// Shared cart storage for in-memory cart functionality
// In production, this should be replaced with a proper database

export const userCarts = new Map<string, any[]>();
