import bcrypt from 'bcryptjs';

const dummy_users = [
  {
    name: 'Admin User',
    email: 'admin@gmaill.com',
    password: bcrypt.hashSync('admin', 10) ,
    isAdmin: true,
  },
  {
    name: 'Luke',
    email: 'luke@gmaill.com',
    password: bcrypt.hashSync('luke', 10) ,
    isAdmin: false,
  },
  {
    name: 'Denise',
    email: 'denise@gmaill.com',
    password: bcrypt.hashSync('denise', 10) ,
    isAdmin: false,
  },
]

export default dummy_users;