import convert from 'xml-js';
import { LineService } from '../services/line.js';
const lineServiceInstance = new LineService();


const parseRealTime = async openApiResult => {
  const xmlToJson = convert.xml2json(openApiResult, {
    compact: true,
    spaces: 4,
  });

  const data = JSON.parse(xmlToJson);
 
  if (data.realtimeStationArrival == undefined) {
    return data.RESULT;
  } else {
    const realtimeRows = data.realtimeStationArrival.row;
    
    let realTimeArray = [];
    if (Array.isArray(realtimeRows)) {
      // 도착 정보가 1개일때는 배열이 아니라 객체이기 때문에 조건문 처리함
      for (let i in realtimeRows) {
        const line = await lineServiceInstance.getLineByLineId(
          realtimeRows[i].subwayId._text,
        );
        let realTimeObject = {
          stationId: realtimeRows[i].statnId._text,
          lineName: line.line_name,
          lineId: realtimeRows[i].subwayId._text,
          arriveTime: realtimeRows[i].barvlDt._text,
          trainDirection: realtimeRows[i].updnLine._text,
          trainDestination: realtimeRows[i].trainLineNm._text,
          updatedAt: realtimeRows[i].recptnDt._text
        };
        realTimeArray.push(realTimeObject);
      }
    } else {
      const realTimeObject = {
        lineName: lineServiceInstance.getLineByLineId(
          realtimeRows.subwayId._text,
        ),
        lineId: realtimeRows.subwayId._text,
        arriveTime: await correctArriveInfo(realtimeRows.barvlDt._text,realtimeRows.recptnDt._text),
        trainDirection: realtimeRows.updnLine._text,
        trainDestination: realtimeRows.trainLineNm._text,
        updatedAt: realtimeRows.recptnDt._text
      };
      realTimeArray.push(realTimeObject);
    }
    return realTimeArray;
  }
};

export default parseRealTime;
