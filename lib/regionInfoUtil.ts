export function getRegionInfoForProvince(nationality: string, provinceEntered: string, visaPolicies: any) {
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
  