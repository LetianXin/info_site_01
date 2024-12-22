import React from "react";

// Define a type for the card variant
type PaymentCardVariant = "checklist" | "bulleted" | "blackcard";

interface PaymentCardProps {
  variant: PaymentCardVariant;
  title: string;
  // For the checklist variant
  checkedItems?: string[];
  crossedItems?: string[];
  // For the bulleted variant
  bulletItems?: string[];
  // For the black card variant
  paragraph?: string;
  imageSrc?: string;
}

export default function PaymentCard({
  variant,
  title,
  checkedItems = [],
  crossedItems = [],
  bulletItems = [],
  paragraph = "",
  imageSrc = "",
}: PaymentCardProps) {
  // Common title styling
  const titleClass =
    variant === "blackcard"
      ? "text-white font-bold text-lg mb-4"
      : "text-black font-bold text-lg mb-4";

  // Card container styling
  const cardClass =
    variant === "blackcard"
      ? "bg-black max-w-[60%] text-white p-4 rounded-lg"
      : "bg-white max-w-[60%] text-black p-4 rounded-lg border border-gray-300";

  return (
    <div className={cardClass}>
      <h3 className={titleClass}>{title}</h3>
      {variant === "checklist" && (
        <ul className="space-y-2">
          {checkedItems.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-600">
                <img src="/tick.jpg" alt="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
          {crossedItems.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-red-600">
                <img src="/check.jpg" alt="false" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {variant === "bulleted" && (
        <ul className="list-disc list-inside space-y-1">
          {bulletItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {variant === "blackcard" && (
        <div className="flex flex-row justify-start">
          <div className="mb-4 max-w-[60%]">{paragraph}</div>
          {imageSrc && (
            <div>
              <img src={imageSrc} alt="Card illustration" className="w-16 h-16" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
