import { LineService } from '../services/line.js';
const lineServiceInstance = new LineService();

const makeLinesArrayByStationIds = async stations => {
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
  return lines;
};

export default makeLinesArrayByStationIds;
