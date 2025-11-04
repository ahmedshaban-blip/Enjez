import { Link } from "react-router-dom";
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import AuthCard from '../../components/common/AuthCard.jsx';
import LogoHeader from '../../components/common/LogoHeader.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoHeader title="Welcome back" subtitle="Sign in to continue" />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="********"
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
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
