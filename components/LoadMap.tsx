import React, { useEffect, useRef } from "react";

interface LoadMapProps {
  onProvinceHover: (province: string) => void;
  onProvinceClick: (province: string) => void;
  selectedProvince?: string;
}

const LoadMap: React.FC<LoadMapProps> = ({ onProvinceHover, onProvinceClick, selectedProvince }) => {
  const objectRef = useRef<HTMLObjectElement>(null);
  let selectedPath: SVGPathElement | null = null;

  useEffect(() => {
    let svgElement: SVGElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      if (selectedProvince) return; // If locked, ignore hover
      const target = e.target as SVGPathElement;
      if (target && target.nodeName === "path") {
        const provinceName = target.getAttribute("name");
        if (provinceName) {
          target.style.fill = "var(--highlight-color, #D95638)";
          onProvinceHover(provinceName);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (selectedProvince) return; // If locked, ignore hover
      const target = e.target as SVGPathElement;
      if (target && target.nodeName === "path") {
        target.style.fill = "";
        onProvinceHover("");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as SVGPathElement;
      if (target && target.nodeName === "path") {
        const provinceName = target.getAttribute("name");
        if (provinceName) {
          // Remove outline from previously selected path if any
          if (selectedPath && selectedPath !== target) {
            selectedPath.style.stroke = "";
            selectedPath.style.strokeWidth = "";
          }

          // Add outline to the clicked path
          target.style.stroke = "black";
          target.style.strokeWidth = "2";
          selectedPath = target;

          onProvinceClick(provinceName);
        }
      }
    };

    const handleLoad = () => {
      if (!objectRef.current) return;
      const contentDoc = objectRef.current.contentDocument;
      if (!contentDoc) return;

      svgElement = contentDoc.querySelector("svg");
      if (!svgElement) return;

      svgElement.addEventListener("mouseover", handleMouseOver);
      svgElement.addEventListener("mouseout", handleMouseOut);
      svgElement.addEventListener("click", handleClick);
    };

    if (objectRef.current) {
      if (objectRef.current.contentDocument) {
        handleLoad();
      } else {
        objectRef.current.addEventListener("load", handleLoad, { once: true });
      }
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("mouseover", handleMouseOver);
        svgElement.removeEventListener("mouseout", handleMouseOut);
        svgElement.removeEventListener("click", handleClick);
      }
    };
  }, [onProvinceHover, onProvinceClick, selectedProvince]);

  return (
    <div className="w-full h-full relative">
      <object
        ref={objectRef}
        data="/CN.svg"
        type="image/svg+xml"
        className="w-full h-full"
      />
    </div>
  );
};

export default LoadMap;
