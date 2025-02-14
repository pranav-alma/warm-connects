import React from "react";

interface ConditionalRenderProps {
  if: boolean;
  children: React.ReactNode;
}

const ConditionalRender: React.FC<ConditionalRenderProps> = ({ if: condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default ConditionalRender;
