import logo from "../../assets/logo.png";

export default function LogoHeader({ title = 'Enjez', subtitle }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <img src={logo} alt={`${title} logo`} className="h-10 w-10 rounded-xl object-contain" />
      <div>
        <p className="text-xl font-semibold text-neutral-900">{title}</p>
        {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
      </div>
    </div>
  );
}
