const express = require("express");
let path = require("path");
const morgan = require("morgan");
const request = require("request");
const convert = require("xml-js");

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));

const key = "4b7575636e716a7635376552784e49"; //인증키



app.get("/:station", function (req, res, next) {
    const apiAddress = encodeURI(
      `http://swopenAPI.seoul.go.kr/api/subway/${key}/xml/realtimeStationArrival/0/5/${req.params.station}`
    );
    request(apiAddress, function (error, response, body) {
    if (error) {
      console.log(error);
    }

    const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 }); 
    var data = JSON.parse(xmlToJson).realtimeStationArrival.row; 
    var dataStr = `${req.params.station}<br/>`;
    for (i in data) {
      if (
        true //  data[i].subwayId._text == "1002" 
      ) {
        console.log(`${data[i].barvlDt._text}초 후 `);
        // console.log(`${data[i].trainLineNm._text} : ${data[i].barvlDt._text}초 후 `);
        dataStr += `${data[i].trainLineNm._text} : ${data[i].barvlDt._text}초 후 <br/>`;
      }
    }
    console.log(JSON.parse(JSON.stringify(data)));

    res.send(dataStr);
  });
});

app.get('/:month/:line/:station', function (req, res, next) {
  const myaddr = encodeURI(`http://openapi.seoul.go.kr:8088/67665a5268716a7637305252586872/xml/CardSubwayTime/1/5/${req.params.month}/${req.params.line}호선/${req.params.station}/`);
  request(myaddr, function (error, response, body) {
      if (error) {
          console.log(error);
      }
    const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 }); // xml을 json 형식 문자열로 추출
    
    var data = JSON.parse(xmlToJson).CardSubwayTime.row; //json 문자열 객체로 변환 후 실제 시간별 승객수 들어있는 row 데이터만 꺼냄
    console.log(data);
      var str = "";
      
      for (time in data) {
          str += `${time} : ${data[`${time}`]._text}<br>`; //브라우저에  표시
          
          console.log(`${time} : ${data[`${time}`]._text}`);  //콘솔에 시간대별 승객수 출력
      }


      res.send(str);
      
  })
});
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
