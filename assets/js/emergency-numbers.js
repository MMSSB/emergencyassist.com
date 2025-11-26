// Emergency numbers by country
export const emergencyNumbers = {
  // North America
  'US': { police: '911', medical: '911', fire: '911' },
  'CA': { police: '911', medical: '911', fire: '911' },
  'MX': { police: '911', medical: '911', fire: '911' },
  
  // Europe
  'GB': { police: '999', medical: '999', fire: '999' },
  'DE': { police: '110', medical: '112', fire: '112' },
  'FR': { police: '17', medical: '15', fire: '18' },
  'IT': { police: '113', medical: '118', fire: '115' },
  'ES': { police: '091', medical: '061', fire: '080' },
  'NL': { police: '112', medical: '112', fire: '112' },
  
  // Middle East
  'EG': { police: '122', medical: '123', fire: '180' },
  'SA': { police: '999', medical: '997', fire: '998' },
  'AE': { police: '999', medical: '998', fire: '997' },
  'TR': { police: '155', medical: '112', fire: '110' },
  
  // Asia
  'IN': { police: '100', medical: '102', fire: '101' },
  'CN': { police: '110', medical: '120', fire: '119' },
  'JP': { police: '110', medical: '119', fire: '119' },
  'KR': { police: '112', medical: '119', fire: '119' },
  
  // Africa
  'ZA': { police: '10111', medical: '10177', fire: '10111' },
  'NG': { police: '112', medical: '112', fire: '112' },
  'KE': { police: '999', medical: '999', fire: '999' },
  
  // South America
  'BR': { police: '190', medical: '192', fire: '193' },
  'AR': { police: '101', medical: '107', fire: '100' },
  
  // Oceania
  'AU': { police: '000', medical: '000', fire: '000' },
  'must': { police: '000.1', medical: '000.1', fire: '000.1' },
  'NZ': { police: '111', medical: '111', fire: '111' }
};

// Get emergency numbers by country code
export function getEmergencyNumbers(countryCode) {
  return emergencyNumbers[countryCode] || { police: '122', medical: '122', fire: '122' };
}

// Get country name from country code
export function getCountryName(countryCode) {
  const countryNames = {
    'US': 'United States', 'CA': 'Canada', 'MX': 'Mexico',
    'GB': 'United Kingdom', 'DE': 'Germany', 'FR': 'France',
    'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
    'EG': 'Egypt', 'SA': 'Saudi Arabia', 'AE': 'United Arab Emirates',
    'TR': 'Turkey', 'IN': 'India', 'CN': 'China',
    'JP': 'Japan', 'KR': 'South Korea', 'ZA': 'South Africa',
    'NG': 'Nigeria', 'KE': 'Kenya', 'BR': 'Brazil',
    'AR': 'Argentina', 'AU': 'Australia', 'NZ': 'New Zealand'
  };
  
  return countryNames[countryCode] || 'Your Country';
}