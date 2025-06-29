import React from 'react';

export function Checkbox({ id, checked, onCheckedChange, className = '' }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`h-4 w-4 rounded border border-gray-400 focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
