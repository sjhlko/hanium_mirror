import library from '../../library/index.js';
import { StationService } from '../../services/station.js';
const stationServiceInstance = new StationService();

const inCaseStationName = async (req, res, next) => {
  const stationIdOrName = req.params.stationIdOrName;
  const isStationName = await library.isStationName(stationIdOrName);

  if (isStationName) {
    const stationName = stationIdOrName;
    const stations = await stationServiceInstance.getAllStationByStationName(
      stationName,
    );
    const lines = await library.makeLinesArrayByStationIds(stations);

    req.stationName = stationName;
    req.lines = lines;
    req.isStationName = isStationName;

    next();
  } else {
    next();
  }
};

export default inCaseStationName;
