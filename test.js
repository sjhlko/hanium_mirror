import express from 'express';
import path from 'path';
import morgan from 'morgan';
import request from 'request';
import convert from 'xml-js';
import config from './config/index.js';

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));

const ArriveTimekey = config.arriveTimeKey;

function doRequest(station) {
  return new Promise(function (resolve, reject) {
    const apiAddress = encodeURI(
      `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${station}`,
    );
    request(apiAddress, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject('error');
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('초기 페이지입니다.')
});

app.get('/favicon.ico', (req, res) => {
  res.status(204);  // favicon.ico으로 인한 중복 요청 방지
});

app.get('/:station', async function (req, res, next) {
  console.log('res.json');
  try {
    var xmlToJson = convert.xml2json(await doRequest(req.params.station), {
      compact: true,
      spaces: 4,
    });
  } catch (error) {
    res.redirect('/');
  }
  var data = JSON.parse(xmlToJson);
  var rowData = data.realtimeStationArrival.row;
  console.log(rowData);
  var dataStr = `${req.params.station}<br/>`;
  if (Array.isArray(rowData)) {  // 도착 정보가 1개일때는 배열이 아니라 객체이기 때문에 조건문 처리함
    for (let i in rowData) {
      dataStr += `(호선 번호 : ${rowData[i].subwayId._text}) ${rowData[i].trainLineNm._text} : ${rowData[i].barvlDt._text}초 후 도착<br/>`;
    }
  } else {
    dataStr += `(호선 번호 : ${rowData.subwayId._text}) ${rowData.trainLineNm._text} : ${rowData.barvlDt._text}초 후 도착<br/>`;
  }

  res.send(dataStr);
});


const rideAlightKey = config.rideAlightKey;

app.get('/:month/:line/:station', function (req, res, next) {
  const myaddr = encodeURI(
    `http://openapi.seoul.go.kr:8088/${rideAlightKey}/xml/CardSubwayTime/1/5/${req.params.month}/${req.params.line}호선/${req.params.station}/`,
  );
  request(myaddr, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 }); // xml을 json 형식 문자열로 추출

    var data = JSON.parse(xmlToJson).CardSubwayTime.row; //json 문자열 객체로 변환 후 실제 시간별 승객수 들어있는 row 데이터만 꺼냄
    console.log(data);
    var str = '';

    for (let time in data) {
      str += `${time} : ${data[`${time}`]._text}<br>`; //브라우저에  표시

      console.log(`${time} : ${data[`${time}`]._text}`); //콘솔에 시간대별 승객수 출력
    }

    res.send(str);
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
