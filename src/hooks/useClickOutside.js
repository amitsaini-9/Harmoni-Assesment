// src/hooks/useClickOutside.js
import { useEffect } from "react";

export function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if ref and ref.current exist and if the click was outside
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
}
