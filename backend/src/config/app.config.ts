import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 9229,
  nodeenv: process.env.NODE_ENV,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
}));
