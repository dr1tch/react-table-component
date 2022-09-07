import useImageExists from "../../hooks/use-image-exists";
import React from "react";

const colors = [
  "bg-slate-700 text-white shadow shadow-slate-200",
  "bg-green-primary text-white shadow shadow-white",
  "bg-blue-800 text-white shadow shadow-white",
  "bg-red-700 text-white shadow shadow-white",
  "bg-orange-700 text-white shadow shadow-white",
  "bg-amber-500 text-slate-700 shadow shadow-white",
  "bg-yellow-500 text-slate-700 shadow shadow-white",
  "bg-teal-700 text-white shadow shadow-white",
  "bg-emerald-500 text-slate-700 shadow shadow-white",
  "bg-cyan-400 text-slate-700 shadow shadow-white",
  "bg-sky-700 text-white shadow shadow-white",
  "bg-indigo-600 text-white shadow shadow-white",
  "bg-violet-700 text-white shadow shadow-white",
  "bg-pink-400 text-slate-700 shadow shadow-white",
  "bg-rose-600 text-white shadow shadow-white",
];
type AvatarProps = {
  url?: string | null;
  name: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  url = "",
  name = "",
  className = "",
}) => {
  const isExists = useImageExists(url);
  // const color = React.useMemo(() => random(0, colors.length - 1), [name, url]);
  return isExists ? (
    <img
      src={url as string}
      alt={name}
      className={` shadow cursor-pointer inline-block h-6 w-6 rounded-full ring-2 ring-green-primary object-cover ${className}`}
    />
  ) : (
    // </Tooltip>
    // <Tooltip placement="right" title={name}>
    <div
      className={`h-8 w-8 rounded-full flex justify-center items-center p-3 cursor-pointer bg-slate-700 text-white shadow shadow-slate-200 ${className}`}
    >
      <span>{name.split(" ").map((char) => char[0].toUpperCase())}</span>
    </div>
    // </Tooltip>
  );
};
export default Avatar;
