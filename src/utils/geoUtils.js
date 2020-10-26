const LATITUDE = {
  MIN: -90,
  MAX: 90,
};
const LONGITUDE = {
  MIN: -180,
  MAX: 180,
};
function generateRandomCoordinates() {
  return [generateRandomLatitude(), generateRandomLongitude()];
}

function generateRandomLatitude() {
  return Math.random() * (LATITUDE.MAX - LATITUDE.MIN) + LATITUDE.MIN;
}

function generateRandomLongitude() {
  return Math.random() * (LONGITUDE.MAX - LONGITUDE.MIN) + LONGITUDE.MIN;
}

export default {
  generateRandomCoordinates,
  generateRandomLatitude,
  generateRandomLongitude,
};
