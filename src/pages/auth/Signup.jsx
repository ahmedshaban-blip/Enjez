import { Link } from "react-router-dom";
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import AuthCard from '../../components/common/AuthCard.jsx';
import LogoHeader from '../../components/common/LogoHeader.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase.js';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        role: role,
        createdAt: new Date()
      });

      alert('تم التسجيل بنجاح!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error('خطأ في التسجيل:', error);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoHeader title="Create account" subtitle="Join the team" />
        <form className="space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <Input
              id="signup-name"
              label="Full name"
              placeholder="Jane Doe"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              autoComplete="name"
            />
            <Input
              id="signup-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              autoComplete="email"
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              autoComplete="new-password"
            />
            <Input
              id="signup-confirm-password"
              label="Confirm password"
              type="password"
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" full>
            Create account
          </Button>
          <div className="text-center text-sm text-neutral-600">
            <span>Already have an account?</span>{' '}
            <Link
              to="/login"
              className="text-sm text-neutral-600 transition hover:text-neutral-800 font-medium"
            >
              Sign in
            </Link>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
