const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://admin:password@192.168.1.16:27017/mydb?authSource=admin';

// Define User schema directly in this script
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user", "instructor"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model('User', UserSchema);

const users = [
  {
    username: 'admin1',
    email: 'admin1@example.com',
    fullName: 'Admin User',
    age: 30,
    role: 'admin',
  },
  {
    username: 'instructor1',
    email: 'instructor1@example.com',
    fullName: 'Instructor User',
    age: 35,
    role: 'instructor',
  },
  {
    username: 'student1',
    email: 'student1@example.com',
    fullName: 'Student User',
    age: 20,
    role: 'user',
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert new users
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users:`);
    
    createdUsers.forEach(user => {
      console.log(`- ${user.username} (${user._id}): ${user.role}`);
    });

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedUsers();
