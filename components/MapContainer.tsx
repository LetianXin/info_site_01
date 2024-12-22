"use client";
import { useEffect, useState } from "react";
import LoadMap from "./LoadMap";
import TravelScopeCard from "./TravelScopeCard";
import PortInfoCard from "./PortInfoCard";
import policies from "@/lib/visaPolicy";
import { getRegionInfoForProvince } from "@/lib/regionInfoUtil";

const nationality = "Austria"; // example nationality

const VisaContainer: React.FC = () => {
  const [hoveredProvince, setHoveredProvince] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [regionInfo, setRegionInfo] = useState<{ 
    scope?: string; 
    ports?: string; 
    regionName?: string; 
    highlightProvinces?: string[] 
  }>({});

  useEffect(() => {
    const provinceToUse = selectedProvince || hoveredProvince;
    if (provinceToUse) {
      const info = getRegionInfoForProvince(nationality, provinceToUse, policies);
      if (info) {
        setRegionInfo(info);
      } else {
        setRegionInfo({});
      }
    } else {
      setRegionInfo({});
    }
  }, [hoveredProvince, selectedProvince]);

  const handleProvinceHover = (province: string) => {
    // If a province is selected (locked), ignore hover updates
    if (selectedProvince) return;
    setHoveredProvince(province);
  };

  const handleProvinceClick = (province: string) => {
    if (!province) return;
    setSelectedProvince(province);
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Left Sidebar */}

      {/* Main Content Area: Map + Bottom Cards */}
      <div className="flex-1 relative">
        <div className="w-full h-full">
          <LoadMap
            onProvinceHover={handleProvinceHover}
            onProvinceClick={handleProvinceClick}
            selectedProvince={selectedProvince}
          />
        </div>

        {/* Bottom Cards Container */}
        <div className="absolute bottom-0 left-0 w-full bg-gray-100 flex gap-4 p-4 overflow-x-auto">
          {/* Fixed size, scrollable cards */}
          <div className="flex-shrink-0 w-64 h-48 overflow-y-auto">
            <TravelScopeCard scope={regionInfo.scope} enteredProvince={selectedProvince || hoveredProvince} />
          </div>
          <div className="flex-shrink-0 w-64 h-48 overflow-y-auto">
            <PortInfoCard ports={regionInfo.ports} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaContainer;
