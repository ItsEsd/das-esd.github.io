
// Get general device information
const userAgent = navigator.userAgent;
const platform = navigator.platform;
const language = navigator.language;

// Get screen dimensions
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

// Get browser information
const browserName = navigator.appName;
const browserVersion = navigator.appVersion;

// Initialize device details object
const deviceDetails = {
  userAgent,
  platform,
  language,
  screenWidth,
  screenHeight,
  browserName,
  browserVersion
};

// Get device location
navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Add location to device details
    deviceDetails.latitude = latitude;
    deviceDetails.longitude = longitude;

    // Convert the object to JSON string
    const jsonDeviceDetails = JSON.stringify(deviceDetails, null, 2);

    // Log the JSON data
    console.log(jsonDeviceDetails);
  },
  (error) => {
    console.error("Error getting device location:", error);

    // Convert the object to JSON string without location
    const jsonDeviceDetails = JSON.stringify(deviceDetails, null, 2);

    // Log the JSON data
    console.log(jsonDeviceDetails);
  }
);

