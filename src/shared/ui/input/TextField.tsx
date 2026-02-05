type TextFieldProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  value: string
  placeholder?: string
  error?: string
  onChange: (value: string) => void
  autoComplete?: string
}

export const TextField = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
  autoComplete,
}: TextFieldProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm text-text-secondary">
      <span>{label}</span>
      <input
        className={[
          'w-full rounded-xl border bg-ink-850/80 px-4 py-2.5 text-sm text-text-primary outline-none transition',
          error ? 'border-red-400/70' : 'border-stroke-500 focus:border-brand-400',
        ]
          .filter(Boolean)
          .join(' ')}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  )
}
