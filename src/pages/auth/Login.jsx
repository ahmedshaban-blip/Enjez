import { Link } from "react-router-dom";
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import AuthCard from '../../components/common/AuthCard.jsx';
import LogoHeader from '../../components/common/LogoHeader.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;


        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'user') {
          navigate('/home');
        } else {
          navigate('/');
        }
      } else {
        setError('لا توجد بيانات للمستخدم');
      }
    } catch (error) {
      setError('خطأ في تسجيل الدخول: ' + error.message);
      console.error('خطأ:', error);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoHeader title="Welcome back" subtitle="Sign in to continue" />
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end">
              <a href="#" className="text-sm text-neutral-600 transition hover:text-neutral-800">
                Forgot password?
              </a>
            </div>
          </div>
          <Button type="submit" full>
            Sign in
          </Button>
          <div className="text-center text-sm text-neutral-600">
            <span>Don't have an account?</span>{' '}
            <Link
              to="/signup"
              className="text-sm text-neutral-600 transition hover:text-neutral-800 font-medium"
            >
              Sign up
            </Link>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}