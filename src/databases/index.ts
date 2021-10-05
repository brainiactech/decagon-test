export const dbConnection = {
  url: process.env.DB_URL || 'mongodb://localhost:27017/decagon',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
