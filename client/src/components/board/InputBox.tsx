
interface InputBoxProps {
  position: "top" | "bottom" | "left" | "right";
  placeholder?: string;
}

export default function InputBox({ position, placeholder }: InputBoxProps) {
  return <input className={`input-box ${position}`} placeholder={placeholder} />;
}