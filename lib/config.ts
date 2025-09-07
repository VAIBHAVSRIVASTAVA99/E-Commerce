export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
  MONGODB_URI: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/shopHub',
}
