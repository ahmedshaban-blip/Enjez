export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#f9f9fb] flex items-center justify-center px-4">
      {children}
    </div>
  );
}