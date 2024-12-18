"use client";
import ComboBoxComponent from "@/components/ComboBoxComponent";
import LoadMap from "@/components/LoadMap";
import TravelScopeCard from "@/components/TravelScopeCard";
import PortInfoCard from "@/components/PortInfoCard";
import { countries, chineseCities } from "@/lib/data";
import policies from "@/lib/visaPolicy";
import { useEffect, useState } from "react";

function getRegionInfoForProvince(nationality: string, provinceEntered: string, visaPolicies: any) {
  const policy = visaPolicies.individualPolicies.find((p: any) => p.name.includes("240-Hour Visa-Free Transit"));
  if (!policy) return null;

  for (const region of policy.regionalPorts) {
    const { scopeOfPermittedTravel } = region;
    if (!scopeOfPermittedTravel) continue;
    const { provinces } = scopeOfPermittedTravel;
    if (provinces.includes(provinceEntered)) {
      return {
        scope: scopeOfPermittedTravel.scope,
        ports: region.eligiblePorts.join(", "),
        regionName: region.region,
        highlightProvinces: provinces
      };
    }
  }

  return null;
}

const Visa = () => {
  const [hoveredProvince, setHoveredProvince] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [regionInfo, setRegionInfo] = useState<{ scope?: string; ports?: string; regionName?: string; highlightProvinces?: string[] }>({});

  const nationality = "Austria"; // example nationality

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
  }, [hoveredProvince, selectedProvince, nationality]);

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
      <div className="flex flex-col relative left-0 right-auto min-h-screen min-w-[300px] bg-slate-400 p-4">
        <span>Here is VISA</span>
        <ComboBoxComponent
          inputId="combobox"
          optionsId="options"
          label="Nationality"
          options={countries}
        />

        <ComboBoxComponent
          inputId="origin-combobox"
          optionsId="origin-options"
          label="Origin"
          options={countries}
        />

        <ComboBoxComponent
          inputId="destination-combobox"
          optionsId="destination-options"
          label="Destination"
          options={chineseCities}
        />

        <ComboBoxComponent
          inputId="outbound-destination-combobox"
          optionsId="outbound-destination-options"
          label="Outbound Destination"
          options={countries}
        />
      </div>

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

export default Visa;
