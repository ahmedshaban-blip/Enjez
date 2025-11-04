export default function LogoHeader({ title = 'ServiceHub', subtitle }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-neutral-900" aria-hidden="true" />
      <div>
        <p className="text-xl font-semibold text-neutral-900">{title}</p>
        {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
      </div>
    </div>
  );
}