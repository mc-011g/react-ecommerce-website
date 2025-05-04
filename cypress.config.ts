import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    env: {
      MOCK_TOKEN_VERIFIED: process.env.MOCK_TOKEN_VERIFIED,
      MOCK_TOKEN_UNVERIFIED: process.env.MOCK_TOKEN_UNVERIFIED,
    },
  },
});
