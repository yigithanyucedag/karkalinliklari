import React from "react";

interface IEmoji {
  label: string;
  symbol: string;
  className?: React.HTMLAttributes<HTMLSpanElement>["className"];
}
const Emoji = ({ label, symbol, className }: IEmoji) => (
  <span
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
    className={className}
  >
    {symbol}
  </span>
);
export default Emoji;
