import library from '../../library/index.js'
import { StationExitService } from '../../services/station_exit.js';
const StationExitServiceInstance = new StationExitService();

const getNearestStation = async (req, res, next) => {
    const userLongtitude = Number(req.params.longtitude);
    const userLatitude = Number(req.params.latitude);
    const squareCoordinates = await library.getSquareCoordinates(userLongtitude, userLatitude);
    let nearExits = await StationExitServiceInstance.getAllBySquereCoordinates(squareCoordinates);
    console.log(nearExits);
    
    next();
}

export default getNearestStation;