import React from "react";

const Section = ({ sectionHeading, action, children, style }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md relative z-20" style={style}>
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#C93329] pb-2 mb-4">
        <h2 className="text-2xl font-bold font-serif">{sectionHeading}</h2>
        {action && (
          <a href={action.url} className="text-[#1A73E8] text-sm hover:underline">
            {action.name}
          </a>
        )}
      </div>

      {/* Removed scrolling here */}
      <div>{children}</div>
    </div>
  );
};

export default Section;
