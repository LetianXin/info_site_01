import React from "react";

interface TravelScopeCardProps {
  scope?: string;
  enteredProvince?: string;
}

const TravelScopeCard: React.FC<TravelScopeCardProps> = ({ scope, enteredProvince }) => {
  if (!scope || !enteredProvince) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-bold text-lg">Travel Scope</h2>
        <p className="text-gray-500">Hover over a province to see details</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg">Travel Scope highlighted</h2>
      <p>{scope}.</p>
      <p className="mt-2">Enter from <span className="font-bold">{enteredProvince}</span>.</p>
    </div>
  );
};

export default TravelScopeCard;
