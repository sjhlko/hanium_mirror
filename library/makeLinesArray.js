import { LineService } from "../services/line.js";
const lineServiceInstance = new LineService();

const makeLinesArray = async (stations) => {
    let lines = [];
    for (let i in stations) {
        let lineElement = await lineServiceInstance.getLineByLineId(stations[i].line_id);
        lineElement.stationId = stations[i].station_id;
        lines.push(lineElement);
        // const linesObject = {
        //     lineName: await lineServiceInstance.getLineByLineId(stations[i].line_id,),
        //     lineId: stations[i].line_id,
        // }
        // console.log(linesObject.lineName);
        // lines.push(linesObject);
    }
    return lines;
}

export default makeLinesArray;