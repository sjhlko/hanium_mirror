import { LineService } from '../../services/line.js';
import { StationService } from '../../services/station.js';
const lineServiceInstance = new LineService();
const stationServiceInstance = new StationService();

const makeLinesArrayationIds = async (req, res, next) => {
  const stationName = req.stationName;
  const stations = await stationServiceInstance.getAllStationByStationName(
    stationName,
  );
  let lines = [];
  for (let i in stations) {
    let lineElement = await lineServiceInstance.getLineByLineId(
      stations[i].line_id,
    );
    let lineObject = {
      lineName: lineElement.line_name,
      lineId: lineElement.line_id,
      stationId: stations[i].station_id,
    };
    lines.push(lineObject);
  }
  req.lines = lines;
  next();
};

export default makeLinesArrayationIds;
