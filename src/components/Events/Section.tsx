import React from "react";

interface SectionProps {
  sectionHeading: string;
  action?: { url: string; name: string }; // Make action optional
  children: React.ReactNode;
  style?: React.CSSProperties; // Make style optional
}

const Section: React.FC<SectionProps> = ({ sectionHeading, action, children, style }) => {
  return (
    <div 
      className="bg-white rounded-lg p-8 shadow-md relative z-20 w-[600px] mx-auto"
      style={style}
    >
      {/* Header */}
      <div className="flex justify-between items-left border-b-2 border-[#C93329] pb-2 mb-4">
        <h2 className="text-2xl font-bold font-serif">{sectionHeading}</h2>
        {action && (
          <a href={action.url} className="text-[#1A73E8] text-sm hover:underline">
            {action.name}
          </a>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Section;
