import type { InputPosition } from "@shared/models/Directions";

interface InputBoxProps {
  position: InputPosition
  placeholder?: string;
  onFocus?: (position: InputPosition) => void;
}

export default function InputBoxComponent({ position, placeholder, onFocus }: InputBoxProps) {
  return <input className={`input-box ${position}`} placeholder={placeholder} onFocus={() => onFocus?.(position)}/>;
}