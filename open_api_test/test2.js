const express = require("express");
let path = require("path");
const morgan = require("morgan");
const request = require("request");
const convert = require("xml-js");

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));

const key = "4b7575636e716a7635376552784e49"; //인증키
let station = "역촌"


let apiAddress = encodeURI(
  `http://swopenAPI.seoul.go.kr/api/subway/${key}/xml/realtimeStationArrival/0/5/${station}`
);
app.get("/", function (req, res, next) {
    request(apiAddress, function (error, response, body) {
    if (error) {
      console.log(error);
    }

    const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 }); 
    var data = JSON.parse(xmlToJson).realtimeStationArrival.row;
      console.log(data[0].trainLineNm._text);
      console.log(data);

    // var dataStr = `${station}<br/>`;
    // for (let i in data) {
    //   if (
    //     true //  data[i].subwayId._text == "1002" 
    //   ) {
        
    //     console.log(`${data[i].trainLineNm._text} : ${data[i].barvlDt._text}초 후 `);
    //     dataStr += `${data[i].trainLineNm._text} : ${data[i].barvlDt._text}초 후 <br/>`;
    //   }
    // }
    // console.log(JSON.parse(JSON.stringify(data)));

    // res.send(dataStr);
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
