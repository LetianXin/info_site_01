import React from "react";

interface PortInfoCardProps {
  ports?: string;
}

const PortInfoCard: React.FC<PortInfoCardProps> = ({ ports }) => {
  if (!ports) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-bold text-lg">Port of Entry/Exit</h2>
        <p className="text-gray-500">Hover over a province to see details</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg">Port of Entry/Exit</h2>
      <p>{ports}</p>
      <a href="#" className="text-red-500 hover:underline mt-2 inline-block">Learn More</a>
    </div>
  );
};

export default PortInfoCard;
