import { connect } from 'mongoose';

const db_uri = process.env.DB_URI;

export async function run() {
  const connectionpOptions = {
    dbName: `payever`,
    useUnifiedTopology: true,
  };

  await connect(db_uri, connectionpOptions);
  console.log('Connected to mongo!');
}
