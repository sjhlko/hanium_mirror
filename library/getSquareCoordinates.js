import distance from "gps-distance";

const getSquareCoordinates = async (userLongtitude, userLatitude) => {
    const LengthOfSquere = 100;

    const lonDiff = LengthOfSquere / 2 / (1000 * distance(userLatitude, userLongtitude, userLatitude, userLongtitude - 1));
    const latDiff = LengthOfSquere / 2 / (1000 * distance(userLatitude, userLongtitude, userLatitude -1, userLongtitude));

    
    const topLeftLongtitude = Math.floor((userLongtitude - lonDiff) * 1000000) / 1000000;
    const topLeftLatitude = Math.floor((userLatitude + latDiff) * 1000000) / 1000000;
    const bottomRightLongtitude = Math.floor((userLongtitude + lonDiff) * 1000000) / 1000000;
    const bottomRightLatitude = Math.floor((userLatitude - latDiff)*1000000)/1000000;
    console.log(topLeftLatitude);
    console.log(topLeftLongtitude);
    console.log(bottomRightLatitude);
    console.log(bottomRightLongtitude);
    const squareCoordinates = {
        topLeftLongtitude: topLeftLongtitude,
        topLeftLatitude: topLeftLatitude,
        bottomRightLongtitude: bottomRightLongtitude,
        bottomRightLatitude: bottomRightLatitude
    }

    return squareCoordinates;
}
export default getSquareCoordinates;