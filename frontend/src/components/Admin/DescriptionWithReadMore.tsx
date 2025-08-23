import React, { useState } from "react";

interface DescriptionWithReadMoreProps {
  text: string;
  maxChars?: number; // optional limit
}

const DescriptionWithReadMore: React.FC<DescriptionWithReadMoreProps> = ({ text, maxChars = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxChars) {
    return <div className="text-sm text-neutral/70 break-words max-w-xl">{text}</div>;
  }

  return (
    <div className="text-sm text-neutral/70 break-words max-w-xl">
      {expanded ? text : `${text.slice(0, maxChars)}... `}
      <button
        className="text-primary font-semibold ml-1"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default DescriptionWithReadMore;
