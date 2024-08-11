const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full h-[6px] bg-gray-200 rounded-lg">
      <div
        className={`absolute top-0 left-0 h-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-400`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
