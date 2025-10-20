import React from "react";
import PropTypes from "prop-types";
import { getFormattedCurrency } from "../../../util";

export const CurrencyDisplay = ({
  value,
  className = "",
  showTooltip = true,
  size = "md",
}) => {
  const formatted = getFormattedCurrency(value);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  if (!showTooltip) {
    return (
      <span className={`${sizeClasses[size]} ${className}`}>
        {formatted.display}
      </span>
    );
  }

  return (
    <span
      className={`inline-block ${sizeClasses[size]} ${className}`}
      title={formatted.fullValue}
      role="tooltip"
      aria-label={`Amount: ${formatted.fullValue}`}
    >
      {formatted.display}
    </span>
  );
};

CurrencyDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  showTooltip: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
};

export default CurrencyDisplay;
