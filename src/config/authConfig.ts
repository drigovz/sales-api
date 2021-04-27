const secret: string = process.env.TOKEN_SECRET || '1b6d8a90ea424e3724ef2eb5cce41486';

export default {
  jwt: {
    secret: secret,
    expiresIn: '3d',
  },
};
