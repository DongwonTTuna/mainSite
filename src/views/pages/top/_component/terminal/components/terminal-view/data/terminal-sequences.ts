import type { LogLine } from "../types/terminal.types"

export const terminalSequences: LogLine[] = [
  // Project initialization
  { id: 1, text: "npm init -y", type: "command", delay: 500 },
  { id: 2, text: "Wrote to /home/dev/project/package.json:", type: "info", delay: 300 },
  { id: 3, text: "{", type: "log", delay: 100 },
  { id: 4, text: '  "name": "api-service",', type: "log", delay: 50 },
  { id: 5, text: '  "version": "1.0.0",', type: "log", delay: 50 },
  { id: 6, text: '  "main": "index.js",', type: "log", delay: 50 },
  { id: 7, text: '  "license": "MIT"', type: "log", delay: 50 },
  { id: 8, text: "}", type: "log", delay: 50 },

  // NestJS installation
  { id: 9, text: "npm i -g @nestjs/cli", type: "command", delay: 500 },
  { id: 10, text: "⠋ Installing @nestjs/cli...", type: "system", delay: 200 },
  { id: 11, text: "✔ @nestjs/cli@10.2.1 installed successfully", type: "success", delay: 1500 },

  // Create new NestJS project
  { id: 12, text: "nest new api-service --package-manager npm", type: "command", delay: 300 },
  { id: 13, text: "⚡ We will scaffold your app in a few seconds..", type: "info", delay: 400 },
  { id: 14, text: "CREATE api-service/.eslintrc.js (663 bytes)", type: "system", delay: 100 },
  { id: 15, text: "CREATE api-service/.prettierrc (51 bytes)", type: "system", delay: 50 },
  { id: 16, text: "CREATE api-service/nest-cli.json (171 bytes)", type: "system", delay: 50 },
  { id: 17, text: "CREATE api-service/package.json (1980 bytes)", type: "system", delay: 50 },
  { id: 18, text: "CREATE api-service/tsconfig.json (546 bytes)", type: "system", delay: 50 },
  { id: 19, text: "CREATE api-service/src/main.ts (208 bytes)", type: "system", delay: 50 },
  { id: 20, text: "CREATE api-service/src/app.module.ts (249 bytes)", type: "system", delay: 50 },
  { id: 21, text: "CREATE api-service/src/app.controller.ts (274 bytes)", type: "system", delay: 50 },
  { id: 22, text: "CREATE api-service/src/app.service.ts (142 bytes)", type: "system", delay: 50 },
  { id: 23, text: "✔ Installation in progress... ☕", type: "success", delay: 300 },
  { id: 24, text: "🚀 Successfully created project api-service", type: "success", delay: 2000 },

  // Generate auth module
  { id: 44, text: "nest g module auth", type: "command", delay: 1000 },
  { id: 45, text: "CREATE src/auth/auth.module.ts (82 bytes)", type: "system", delay: 200 },
  { id: 46, text: "UPDATE src/app.module.ts (312 bytes)", type: "system", delay: 100 },

  // Generate auth controller
  { id: 47, text: "nest g controller auth --no-spec", type: "command", delay: 400 },
  { id: 48, text: "CREATE src/auth/auth.controller.ts (97 bytes)", type: "system", delay: 200 },
  { id: 49, text: "UPDATE src/auth/auth.module.ts (170 bytes)", type: "system", delay: 100 },

  // Generate auth service
  { id: 50, text: "nest g service auth --no-spec", type: "command", delay: 400 },
  { id: 51, text: "CREATE src/auth/auth.service.ts (88 bytes)", type: "system", delay: 200 },
  { id: 52, text: "UPDATE src/auth/auth.module.ts (246 bytes)", type: "system", delay: 100 },

  // Install dependencies
  {
    id: 53,
    text: "npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt",
    type: "command",
    delay: 500
  },
  { id: 54, text: "⠋ Installing dependencies...", type: "system", delay: 300 },
  { id: 55, text: "added 23 packages, and audited 847 packages in 4s", type: "info", delay: 1500 },
  { id: 56, text: "✔ Dependencies installed successfully", type: "success", delay: 100 },

  // Creating auth.service.ts
  { id: 57, text: "cat > src/auth/auth.service.ts << 'EOF'", type: "command", delay: 600 },
  { id: 58, text: "Writing auth service implementation...", type: "info", delay: 300 },
  { id: 81, text: "✔ Created src/auth/auth.service.ts", type: "success", delay: 100 },

  // Creating jwt.strategy.ts
  { id: 82, text: "cat > src/auth/jwt.strategy.ts << 'EOF'", type: "command", delay: 400 },
  { id: 83, text: "Writing JWT strategy implementation...", type: "info", delay: 300 },
  { id: 103, text: "✔ Created src/auth/jwt.strategy.ts", type: "success", delay: 100 },

  // Run tests
  { id: 104, text: "npm run test:e2e -- auth", type: "command", delay: 500 },
  { id: 105, text: "> api-service@1.0.0 test:e2e", type: "info", delay: 200 },
  { id: 106, text: "> jest --config ./test/jest-e2e.json auth", type: "info", delay: 100 },
  { id: 107, text: "PASS test/auth.e2e-spec.ts", type: "success", delay: 800 },
  { id: 108, text: "  Auth API", type: "log", delay: 100 },
  { id: 109, text: "    ✓ /auth/login (POST) - should return JWT token (125ms)", type: "success", delay: 200 },
  { id: 110, text: "    ✓ /auth/profile (GET) - should return user profile (45ms)", type: "success", delay: 150 },
  { id: 111, text: "    ✓ /auth/profile (GET) - should return 401 without token (23ms)", type: "success", delay: 100 },
  { id: 112, text: "", type: "log", delay: 50 },
  { id: 113, text: "Test Suites: 1 passed, 1 total", type: "success", delay: 100 },
  { id: 114, text: "Tests:       3 passed, 3 total", type: "success", delay: 50 },
  { id: 115, text: "Time:        2.341s", type: "info", delay: 50 },

  // Git commit
  { id: 116, text: 'git add -A && git commit -m "feat: Add JWT authentication"', type: "command", delay: 500 },
  { id: 117, text: "[main 8a3f2d1] feat: Add JWT authentication", type: "system", delay: 300 },
  { id: 118, text: " 5 files changed, 187 insertions(+)", type: "info", delay: 100 },

  // Deploy
  { id: 119, text: "npm run deploy:prod", type: "command", delay: 400 },
  { id: 120, text: "> Building for production...", type: "info", delay: 200 },
  { id: 121, text: "Hash: 3f8e2a1b4c5d6e7f8g9h", type: "system", delay: 500 },
  { id: 122, text: "Version: webpack 5.90.1", type: "system", delay: 50 },
  { id: 123, text: "Time: 8234ms", type: "system", delay: 800 },
  { id: 124, text: "Built at: 12/21/2024 11:15:32 AM", type: "system", delay: 100 },
  { id: 125, text: "Deploying to production environment...", type: "info", delay: 300 },
  { id: 126, text: "✔ JWT authentication feature deployed successfully!", type: "success", delay: 1200 },
  { id: 127, text: "🚀 API v1.1.0 is now live at https://api.production.com", type: "success", delay: 200 }
]
