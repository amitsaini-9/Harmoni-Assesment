// src/components/common/ErrorMessage.jsx
import React from "react";
import PropTypes from "prop-types";

function ErrorMessage({ message, retry = null }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-red-600 mb-2">
        <svg
          className="w-12 h-12 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold">{message}</p>
      </div>
      {retry && (
        <Button variant="outline" size="small" onClick={retry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
};

export default ErrorMessage;
