
interface InputBoxProps {
  position: "top" | "bottom" | "left" | "right";
  placeholder?: string;
  onFocus?: (position: "top" | "bottom" | "left" | "right") => void;
}

export default function InputBoxComponent({ position, placeholder, onFocus }: InputBoxProps) {
  return <input className={`input-box ${position}`} placeholder={placeholder} onFocus={() => onFocus?.(position)}/>;
}