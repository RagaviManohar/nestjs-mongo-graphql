export default () => ({
  port: Number(process.env.PORT),
  baseUrl: process.env.API_BASE_URL,
  mongoURI: process.env.APP_MONGO_URI,
});
