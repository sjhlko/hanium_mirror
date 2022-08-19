import convert from 'xml-js';
import { LineService } from '../services/line.js';
const lineServiceInstance = new LineService();

const parseRealTime = async openApiResult => {
  const data = openApiResult;

  const realtimeRows = data.realtimeArrivalList;
  
  let realTimeArray = [];
  
  if (Array.isArray(realtimeRows)) {
    // 도착 정보가 1개일때는 배열이 아니라 객체이기 때문에 조건문 처리함
    for (let i in realtimeRows) {
      const line = await lineServiceInstance.getLineByLineId(
        realtimeRows[i].subwayId,
      );
      let realTimeObject = {
        stationId: realtimeRows[i].statnId,
        lineName: line.line_name,
        lineId: realtimeRows[i].subwayId,
        arriveTime: realtimeRows[i].barvlDt,
        trainDirection: realtimeRows[i].updnLine,
        trainDestination: realtimeRows[i].trainLineNm,
        updatedAt: realtimeRows[i].recptnDt,
      };
      realTimeArray.push(realTimeObject);
    }
  } else {
    const realTimeObject = {
      lineName: lineServiceInstance.getLineByLineId(
        realtimeRows.subwayId,
      ),
      lineId: realtimeRows.subwayId,
      arriveTime: realtimeRows.barvlDt,
      trainDirection: realtimeRows.updnLine,
      trainDestination: realtimeRows.trainLineNm,
      updatedAt: realtimeRows.recptnDt,
    };
    realTimeArray.push(realTimeObject);
  }

  return realTimeArray;
};

export default parseRealTime;
