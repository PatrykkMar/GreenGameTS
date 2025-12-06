
export type TileProps = {
  words: string[]; 
};

export default function WordsTile({ words }: TileProps) {
  return (
    <div className="bg-blue-800 grid grid-cols-2 grid-rows-2 gap-4 p-4 rounded-2xl shadow-md">
      {words.map((word, idx) => (
        <div
          key={idx}
          className="bg-yellow-400 text-center p-2 rounded-lg font-semibold"
        >
          {word}
        </div>
      ))}
    </div>
  );
}