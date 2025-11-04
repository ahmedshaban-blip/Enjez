export default function Button({
  children,
  type = 'button',
  className = '',
  full = false,
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition shadow-sm';
  const colorClasses = 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black';
  const focusClasses = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400';
  const widthClass = full ? 'w-full' : '';
  const classes = [baseClasses, colorClasses, focusClasses, widthClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}