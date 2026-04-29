require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');

const COURSES = [
  {
    title: 'CIT',
    description: 'Computer Information Technology — cover karta hai computer fundamentals, MS Office, internet basics, aur IT essentials jo har professional ke liye zaroori hain.',
    duration: '3 Months',
    category: 'Technology',
    level: 'Beginner',
    icon: '🖥️',
    tags: ['Computer Basics', 'MS Office', 'Internet', 'IT Skills'],
    price: 0,
    enrolledCount: 12,
  },
  {
    title: 'Web Development',
    description: 'Modern web development seekho — HTML, CSS, JavaScript, aur React se stunning websites aur web apps banao. Beginner se professional tak complete journey.',
    duration: '4 Months',
    category: 'Web Development',
    level: 'Beginner',
    icon: '🌐',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    price: 0,
    enrolledCount: 18,
  },
  {
    title: 'Python Development',
    description: 'Python programming language seekho — basics se lekar advanced tak. Automation, data analysis, aur real-world projects ke saath practical skills hasil karo.',
    duration: '3 Months',
    category: 'Programming',
    level: 'Beginner',
    icon: '🐍',
    tags: ['Python', 'Automation', 'Data Analysis', 'Projects'],
    price: 0,
    enrolledCount: 15,
  },
  {
    title: 'Graphic Designing',
    description: 'Professional graphic design seekho — Adobe Photoshop, Illustrator, logo design, branding, aur social media graphics banane ki complete training.',
    duration: '3 Months',
    category: 'Design',
    level: 'Beginner',
    icon: '🎨',
    tags: ['Photoshop', 'Illustrator', 'Logo Design', 'Branding'],
    price: 0,
    enrolledCount: 10,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    await User.deleteMany({});

    const courses = await Course.insertMany(COURSES);
    console.log(`✅ Seeded ${courses.length} courses`);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'Admin User',
      email: 'admin@techxacademy.com',
      phone: '+92-300-0000000',
      password: 'admin123',
      role: 'admin',
    });

    console.log('✅ Admin user created: admin@techxacademy.com / admin123');
    console.log('🚀 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
