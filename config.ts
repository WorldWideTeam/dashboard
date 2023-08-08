export default {
  ApplicationPort: 3000,
  LogLevel: 'info',
  IsProduction: process.env.NODE_ENV === 'production',
  Database: {
    Host: 'postgres',
    Name: 'postgres',
    Username: 'postgres',
    Password: 'postgres',
  },
};
