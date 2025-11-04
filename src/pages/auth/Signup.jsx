import { Link } from "react-router-dom";
import AuthLayout from '../../components/layout/AuthLayout.jsx';
import AuthCard from '../../components/common/AuthCard.jsx';
import LogoHeader from '../../components/common/LogoHeader.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoHeader title="Create account" subtitle="Join the team" />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="signup-name"
              label="Full name"
              placeholder="Jane Doe"
              required
              autoComplete="name"
            />
            <Input
              id="signup-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <Input
              id="signup-password"
              label="Password"
              type="password"
              placeholder="********"
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
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
