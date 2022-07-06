const express = require('express'); 
let path = require('path');
const morgan = require('morgan');
const request = require('request');
const convert = require('xml-js');

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));

// app.get('/', function(req, res) {
//   res.send('rootpage')
// });

const key = '67665a5268716a7637305252586872'; //인증키
let month = 202202;
let line = 5;
let station = "올림픽공원(한국체대)"
const myaddr = encodeURI(`http://openapi.seoul.go.kr:8088/67665a5268716a7637305252586872/xml/CardSubwayTime/1/5/${month}/${line}호선/${station}/`);


app.get('/', function (req, res, next) {
    request(myaddr, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        const xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 }); // xml을 json 형식 문자열로 추출
        var data = JSON.parse(xmlToJson).CardSubwayTime.row; //json 문자열 객체로 변환 후 실제 시간별 승객수 들어있는 row 데이터만 꺼냄
        var str = "";
        
        for (time in data) {
            str += `${time} : ${data[`${time}`]._text}<br>`; //브라우저에  표시
            
            console.log(`${time} : ${data[`${time}`]._text}`);  //콘솔에 시간대별 승객수 출력
        }


        res.send(str);
        
    })
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

