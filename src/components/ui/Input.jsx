// src/components/ui/Input.jsx
export default function Input({
  id,
  label,
  type = 'text',
  placeholder = '',
  className = '',
  required = false,
  ...props
}) {
  const inputClasses = [
    'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        {...props}
      />
    </div>
  );
}