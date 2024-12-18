"use client";
import { useEffect } from "react";
import { ComboBox } from "@/lib/comboBox";

interface ComboBoxProps {
  inputId: string;
  optionsId: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function ComboBoxComponent({ inputId, optionsId, label, options }: ComboBoxProps) {
  useEffect(() => {
    // Instantiate the ComboBox after the component mounts
    new ComboBox({
      inputId,
      optionsId,
      options,
    });
  }, [inputId, optionsId, options]);

  return (
    <div className="relative my-4 w-100"> {/* Fixed width of 24rem */}
    <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1">
      <button
        type="button"
        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white
                    py-2 pl-3 pr-10 text-left focus:outline-none z-0"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-labelledby="label"
      >
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M7 7l3-3m0 0l3 3m-3-3v12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <input
        type="text"
        id={inputId}
        className="absolute inset-0 z-10 w-full rounded-md border-transparent bg-transparent
                    py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:border-indigo-500 
                    focus:ring-indigo-500 focus:outline-none"
        role="combobox"
        aria-expanded="false"
        aria-haspopup="listbox"
        placeholder="Select or Enter"
      />
    </div>

    <ul
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 
                  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
      role="listbox"
      id={optionsId}
      aria-labelledby="label"
    ></ul>
    </div>
    
  );
}
