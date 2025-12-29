// Auto-generated from Black Canyon Ultras 100KM.gpx
// Course: Mayer, AZ to Anthem, AZ
// Distance: 62 miles (100k)
// Elevation: ~1,740ft to ~4,190ft

export const BC100K_COURSE = {
  name: 'Black Canyon 100k',
  distance: 62, // miles
  elevationGain: 6800, // feet (approximate)
  elevationLoss: 9200, // feet (approximate)  
  minElevation: 1791,
  maxElevation: 4146,
  
  // Elevation profile sampled to ~150 points (in feet)
  elevationPoints: [
    3999, 3946, 4035, 4094, 4102, 4024, 4136, 4146, 4026, 3968, 3998, 3915, 3859, 3804, 3723, 3612, 3556, 3478, 3394, 3294, 3283, 3218, 3150, 3084, 3045, 3038, 3042, 3046, 3040, 3036, 3030, 3040, 3041, 3073, 3106, 3071, 3003, 2972, 2866, 2806, 2801, 2735, 2684, 2589, 2531, 2708, 2821, 2807, 2773, 2761, 2770, 2753, 2740, 2705, 2717, 2697, 2715, 2695, 2667, 2636, 2637, 2665, 2660, 2627, 2548, 2545, 2274, 2201, 2045, 2135, 2183, 2188, 2172, 2186, 2080, 2216, 2057, 1967, 2089, 2120, 2109, 1992, 1903, 2022, 2125, 2145, 2065, 2029, 2053, 2030, 2063, 2013, 1933, 1973, 2062, 2213, 2257, 2390, 2472, 2434, 2418, 2342, 2313, 2252, 2188, 2120, 2192, 2166, 2101, 2040, 2109, 2081, 1993, 2033, 1919, 1915, 1994, 1915, 1840, 1809, 1791, 1847, 1819, 1834, 1906, 1933, 1950, 2001, 2036, 2096, 2188, 2241, 2364, 2398, 2305, 2284, 2321, 2350, 2315, 2278, 2375, 2384, 2274, 2198, 2110, 2067, 1999, 1953, 1960, 1908, 1912, 1916, 1864
  ],
  
  // Aid stations along the course
  aidStations: [
    { name: 'Antelope Mesa', mile: 7.7 },
    { name: 'Hidden Treasure Mine', mile: 12.9 },
    { name: 'Bumble Bee', mile: 19.4 },
    { name: 'Gloriana Mine', mile: 24 },
    { name: 'Deep Canyon Ranch', mile: 31.9 },
    { name: 'Black Canyon City', mile: 37.2 },
    { name: 'Cottonwood Gulch', mile: 46.4 },
    { name: 'Table Mesa', mile: 51.1 },
    { name: 'Doe Springs', mile: 58.7 }
  ],
} as const;

export type AidStation = {
  name: string;
  mile: number;
};
