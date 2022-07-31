import library from '../../library/index.js';
import { StationService } from '../../services/station.js';
const stationServiceInstance = new StationService();

const inCaseStationId = async (req, res, next) => {
  if (req.isStationName) {
    next();
  } else {
    const stationId = req.params.stationIdOrName;
    const station = await stationServiceInstance.getStationByStationId(
      stationId,
    );
    const stationName = station.station_name;

    const stations = await stationServiceInstance.getAllStationByStationName(
      stationName,
    );
    const lines = await library.makeLinesArrayByStationIds(stations);

    req.stationName = stationName;
    req.lines = lines;
    next();
  }
};

export default inCaseStationId;
