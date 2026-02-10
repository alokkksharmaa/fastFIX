import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  }
  catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};


const createSchema = createSchema => {
  const schema = new mongoose.Schema(createSchema);
  return mongoose.model('Property', schema);
}

export default connectDB;
export { createSchema };
