import React from "react";
import PropTypes from "prop-types";

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  error,
  required,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-white/10 hover:border-white/20"
          }
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export const Label = ({ children, required, className = "" }) => (
  <label className={`block text-sm font-medium text-slate-300 ${className}`}>
    {children}
    {required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};
