export default function HeaderSection({ title, subtitle }) {
  return (
    <div className="mb-10 text-left">
      <h2 className="font-['Poppins'] text-[32px] font-medium text-[#000000] leading-tight">
        {title}
      </h2>

      <p className="font-['Poppins'] text-[16px] text-[#000000] mt-2 opacity-70">
        {subtitle}
      </p>
    </div>
  );
}