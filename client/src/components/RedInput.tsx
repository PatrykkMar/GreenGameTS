type RedInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function RedInput({
  value,
  onChange,
  className = "",
}: RedInputProps) {
  return (
    <input
      className={`border-2 border-red-500 p-2 rounded-lg text-center ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}