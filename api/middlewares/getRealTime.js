import convert from 'xml-js';

const getRealTime = async (req, res, next) => {
  const arriveTimeResult = req.arriveTimeResult;
  var xmlToJson = convert.xml2json(arriveTimeResult, {
    compact: true,
    spaces: 4,
  });
  var data = JSON.parse(xmlToJson);
  console.log(data);
  next();
};

export default getRealTime;
