import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 9229,
  nodeenv: process.env.NODE_ENV,
}));
