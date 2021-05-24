module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || '5432',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['./dist/modules/**/typeorm/entities/*.js'],
  migrations: ['./dist/shared/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: './dist/shared/typeorm/migrations/',
  },
};
