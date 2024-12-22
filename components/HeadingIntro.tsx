import React from "react";

type ButtonVariant = "classic" | "black";
type ContentVariant = "side" | "center";

interface ButtonConfig {
  variant: ButtonVariant;
  btnText: string;
}

interface HeadingIntroProps {
  title?: string;
  subtitle?: string;
  paragraph?: string;
  buttons?: ButtonConfig[];
  contentVariant?: ContentVariant;
}

export default function HeadingIntro({
  title,
  subtitle,
  paragraph = "",
  buttons = [],
  contentVariant = "side"
}: HeadingIntroProps) {

  const classicBtn_orange =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-colors focus:outline-none focus:ring-2 bg-orange-500 text-black hover:bg-orange-600 focus:ring-orange-300";
  const classicBtn_black =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-colors focus:outline-none focus:ring-2 bg-gray-700 text-white hover:bg-black focus:ring-gray-400";

  const containerClasses = `flex flex-col max-w-3xl ${
    contentVariant === "center" ? "mx-auto text-left items-center" : ""
  }`;

  return (
    <div className={containerClasses}>
      {title && (
        <h3 className="text-black font-bold text-6xl">
          {title.toUpperCase()}
        </h3>
      )}
      {subtitle && (
        <div className="text-black font-bold text-2xl my-4">
          {subtitle.toUpperCase()}
        </div>
      )}
      <p className="mb-6 text-base leading-relaxed text-gray-700">{paragraph}</p>

      {buttons.length > 0 && (
        <div className={`flex gap-4 ${contentVariant === "center" ? "justify-center" : ""}`}>
          {buttons.map((button, index) =>
            button.variant === "classic" ? (
              <button key={index} className={classicBtn_orange}>
                {button.btnText}
              </button>
            ) : (
              <button key={index} className={classicBtn_black}>
                {button.btnText}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
