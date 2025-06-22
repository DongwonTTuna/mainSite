import type { LogLine } from '../types/terminal.types'

export const terminalSequences: LogLine[] = [
  // Project initialization
  { id: 1, text: 'npm init -y', type: 'command', delay: 0 },
  { id: 2, text: 'Wrote to /home/dev/project/package.json:', type: 'info', delay: 300 },
  { id: 3, text: '{', type: 'log', delay: 100 },
  { id: 4, text: '  "name": "api-service",', type: 'log', delay: 50 },
  { id: 5, text: '  "version": "1.0.0",', type: 'log', delay: 50 },
  { id: 6, text: '  "main": "index.js",', type: 'log', delay: 50 },
  { id: 7, text: '  "license": "MIT"', type: 'log', delay: 50 },
  { id: 8, text: '}', type: 'log', delay: 50 },
  
  // NestJS installation
  { id: 9, text: 'npm i -g @nestjs/cli', type: 'command', delay: 500 },
  { id: 10, text: '⠋ Installing @nestjs/cli...', type: 'system', delay: 200 },
  { id: 11, text: '✔ @nestjs/cli@10.2.1 installed successfully', type: 'success', delay: 1500 },
  
  // Create new NestJS project
  { id: 12, text: 'nest new api-service --package-manager npm', type: 'command', delay: 300 },
  { id: 13, text: '⚡ We will scaffold your app in a few seconds..', type: 'info', delay: 400 },
  { id: 14, text: 'CREATE api-service/.eslintrc.js (663 bytes)', type: 'system', delay: 100 },
  { id: 15, text: 'CREATE api-service/.prettierrc (51 bytes)', type: 'system', delay: 50 },
  { id: 16, text: 'CREATE api-service/nest-cli.json (171 bytes)', type: 'system', delay: 50 },
  { id: 17, text: 'CREATE api-service/package.json (1980 bytes)', type: 'system', delay: 50 },
  { id: 18, text: 'CREATE api-service/tsconfig.json (546 bytes)', type: 'system', delay: 50 },
  { id: 19, text: 'CREATE api-service/src/main.ts (208 bytes)', type: 'system', delay: 50 },
  { id: 20, text: 'CREATE api-service/src/app.module.ts (249 bytes)', type: 'system', delay: 50 },
  { id: 21, text: 'CREATE api-service/src/app.controller.ts (274 bytes)', type: 'system', delay: 50 },
  { id: 22, text: 'CREATE api-service/src/app.service.ts (142 bytes)', type: 'system', delay: 50 },
  { id: 23, text: '✔ Installation in progress... ☕', type: 'success', delay: 300 },
  { id: 24, text: '🚀 Successfully created project api-service', type: 'success', delay: 2000 },
  
  // Generate auth module
  { id: 44, text: 'nest g module auth', type: 'command', delay: 1000 },
  { id: 45, text: 'CREATE src/auth/auth.module.ts (82 bytes)', type: 'system', delay: 200 },
  { id: 46, text: 'UPDATE src/app.module.ts (312 bytes)', type: 'system', delay: 100 },
  
  // Generate auth controller
  { id: 47, text: 'nest g controller auth --no-spec', type: 'command', delay: 400 },
  { id: 48, text: 'CREATE src/auth/auth.controller.ts (97 bytes)', type: 'system', delay: 200 },
  { id: 49, text: 'UPDATE src/auth/auth.module.ts (170 bytes)', type: 'system', delay: 100 },
  
  // Generate auth service
  { id: 50, text: 'nest g service auth --no-spec', type: 'command', delay: 400 },
  { id: 51, text: 'CREATE src/auth/auth.service.ts (88 bytes)', type: 'system', delay: 200 },
  { id: 52, text: 'UPDATE src/auth/auth.module.ts (246 bytes)', type: 'system', delay: 100 },
  
  // Install dependencies
  { id: 53, text: 'npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt', type: 'command', delay: 500 },
  { id: 54, text: '⠋ Installing dependencies...', type: 'system', delay: 300 },
  { id: 55, text: 'added 23 packages, and audited 847 packages in 4s', type: 'info', delay: 1500 },
  { id: 56, text: '✔ Dependencies installed successfully', type: 'success', delay: 100 },
  
  // First vim file - auth.service.ts
  { id: 57, text: 'vim src/auth/auth.service.ts', type: 'command', delay: 600 },
  { id: 59, text: 'import { Injectable } from \'@nestjs/common\';', type: 'vim', delay: 100 },
  { id: 60, text: 'import { JwtService } from \'@nestjs/jwt\';', type: 'vim', delay: 80 },
  { id: 61, text: 'import * as bcrypt from \'bcrypt\';', type: 'vim', delay: 80 },
  { id: 62, text: '', type: 'vim', delay: 50 },
  { id: 63, text: '@Injectable()', type: 'vim', delay: 80 },
  { id: 64, text: 'export class AuthService {', type: 'vim', delay: 80 },
  { id: 65, text: '  constructor(private jwtService: JwtService) {}', type: 'vim', delay: 100 },
  { id: 66, text: '', type: 'vim', delay: 50 },
  { id: 67, text: '  async validateUser(username: string, pass: string) {', type: 'vim', delay: 100 },
  { id: 68, text: '    // Mock user validation logic', type: 'vim', delay: 80 },
  { id: 681, text: ':vim-cmd:o', type: 'vim', delay: 200 },
  { id: 69, text: '    const user = { id: 1, username, password: await bcrypt.hash(pass, 10) };', type: 'vim', delay: 120 },
  { id: 70, text: '    return user;', type: 'vim', delay: 80 },
  { id: 71, text: '  }', type: 'vim', delay: 60 },
  { id: 72, text: '', type: 'vim', delay: 50 },
  { id: 73, text: '  async login(user: any) {', type: 'vim', delay: 100 },
  { id: 74, text: '    const payload = { username: user.username, sub: user.id };', type: 'vim', delay: 100 },
  { id: 75, text: '    return {', type: 'vim', delay: 80 },
  { id: 76, text: '      access_token: this.jwtService.sign(payload),', type: 'vim', delay: 100 },
  { id: 77, text: '    };', type: 'vim', delay: 60 },
  { id: 78, text: '  }', type: 'vim', delay: 60 },
  { id: 79, text: '}', type: 'vim', delay: 60 },
  { id: 80, text: ':wq', type: 'vim', delay: 300 },
  { id: 81, text: '\'src/auth/auth.service.ts\' written', type: 'system', delay: 100 },
  
  // Second vim file - jwt.strategy.ts
  { id: 82, text: 'vim src/auth/jwt.strategy.ts', type: 'command', delay: 400 },
  { id: 83, text: ':set number', type: 'vim', delay: 300 },
  { id: 84, text: 'import { ExtractJwt, Strategy } from \'passport-jwt\';', type: 'vim', delay: 100 },
  { id: 85, text: 'import { PassportStrategy } from \'@nestjs/passport\';', type: 'vim', delay: 80 },
  { id: 86, text: 'import { Injectable } from \'@nestjs/common\';', type: 'vim', delay: 80 },
  { id: 87, text: '', type: 'vim', delay: 50 },
  { id: 88, text: '@Injectable()', type: 'vim', delay: 80 },
  { id: 89, text: 'export class JwtStrategy extends PassportStrategy(Strategy) {', type: 'vim', delay: 100 },
  { id: 90, text: '  constructor() {', type: 'vim', delay: 80 },
  { id: 91, text: '    super({', type: 'vim', delay: 60 },
  { id: 92, text: '      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),', type: 'vim', delay: 100 },
  { id: 93, text: '      ignoreExpiration: false,', type: 'vim', delay: 80 },
  { id: 94, text: '      secretOrKey: \'SECRET_KEY_HERE\',', type: 'vim', delay: 80 },
  { id: 95, text: '    });', type: 'vim', delay: 60 },
  { id: 96, text: '  }', type: 'vim', delay: 60 },
  { id: 97, text: '', type: 'vim', delay: 50 },
  { id: 98, text: '  async validate(payload: any) {', type: 'vim', delay: 100 },
  { id: 99, text: '    return { userId: payload.sub, username: payload.username };', type: 'vim', delay: 100 },
  { id: 100, text: '  }', type: 'vim', delay: 60 },
  { id: 101, text: '}', type: 'vim', delay: 60 },
  { id: 102, text: ':wq', type: 'vim', delay: 300 },
  { id: 103, text: '\'src/auth/jwt.strategy.ts\' written', type: 'system', delay: 100 },
  
  // Run tests
  { id: 104, text: 'npm run test:e2e -- auth', type: 'command', delay: 500 },
  { id: 105, text: '> api-service@1.0.0 test:e2e', type: 'info', delay: 200 },
  { id: 106, text: '> jest --config ./test/jest-e2e.json auth', type: 'info', delay: 100 },
  { id: 107, text: 'PASS test/auth.e2e-spec.ts', type: 'success', delay: 800 },
  { id: 108, text: '  Auth API', type: 'log', delay: 100 },
  { id: 109, text: '    ✓ /auth/login (POST) - should return JWT token (125ms)', type: 'success', delay: 200 },
  { id: 110, text: '    ✓ /auth/profile (GET) - should return user profile (45ms)', type: 'success', delay: 150 },
  { id: 111, text: '    ✓ /auth/profile (GET) - should return 401 without token (23ms)', type: 'success', delay: 100 },
  { id: 112, text: '', type: 'log', delay: 50 },
  { id: 113, text: 'Test Suites: 1 passed, 1 total', type: 'success', delay: 100 },
  { id: 114, text: 'Tests:       3 passed, 3 total', type: 'success', delay: 50 },
  { id: 115, text: 'Time:        2.341s', type: 'info', delay: 50 },
  
  // Git commit
  { id: 116, text: 'git add -A && git commit -m "feat: Add JWT authentication"', type: 'command', delay: 500 },
  { id: 117, text: '[main 8a3f2d1] feat: Add JWT authentication', type: 'system', delay: 300 },
  { id: 118, text: ' 5 files changed, 187 insertions(+)', type: 'info', delay: 100 },
  
  // Deploy
  { id: 119, text: 'npm run deploy:prod', type: 'command', delay: 400 },
  { id: 120, text: '> Building for production...', type: 'info', delay: 200 },
  { id: 121, text: 'Hash: 3f8e2a1b4c5d6e7f8g9h', type: 'system', delay: 500 },
  { id: 122, text: 'Version: webpack 5.90.1', type: 'system', delay: 50 },
  { id: 123, text: 'Time: 8234ms', type: 'system', delay: 800 },
  { id: 124, text: 'Built at: 12/21/2024 11:15:32 AM', type: 'system', delay: 100 },
  { id: 125, text: 'Deploying to production environment...', type: 'info', delay: 300 },
  { id: 126, text: '✔ JWT authentication feature deployed successfully!', type: 'success', delay: 1200 },
  { id: 127, text: '🚀 API v1.1.0 is now live at https://api.production.com', type: 'success', delay: 200 }
]