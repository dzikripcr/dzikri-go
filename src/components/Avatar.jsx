export default function Avatar({ 
  src,
  alt = "Avatar",
  size = "w-10 h-10"
}) {
  return (
    <div className="cursor-pointer">
      <img
        src={src}
        alt={alt}
        className={`${size} rounded-full border border-gray-200 object-cover`}
      />
    </div>
  );
}