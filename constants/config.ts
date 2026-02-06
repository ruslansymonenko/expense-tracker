/**
 * API Configuration
 *
 * Update the BASE_URL to match your backend server:
 * - Development: http://localhost:3000
 * - Production: https://your-api-domain.com
 *
 * For React Native on physical device, use your machine's IP:
 * - Example: http://192.168.1.100:3000
 */

export const API_CONFIG = {
  BASE_URL: __DEV__
    ? "http://localhost:3000"
    : "https://your-production-api.com",
  TIMEOUT: 10000,
};
