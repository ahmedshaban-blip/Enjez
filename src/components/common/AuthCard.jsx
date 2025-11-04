export default function AuthCard({ children }) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
      {children}
    </div>
  );
}