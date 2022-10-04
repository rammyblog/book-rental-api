import mongoose from 'mongoose';

export default async function connect() {
  const dbUri = process.env.DBURI;

  try {
    await mongoose.connect(dbUri);
    console.log('Connected to db');
  } catch (error) {
    console.error('Could not connect to db');
    process.exit(1);
  }
}
