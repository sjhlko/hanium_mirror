import library from '../../library/index.js'
import sortRealTimeArray from '../../library/sortRealTimeArray.js';


const getRealTime = async (req, res, next) => {
  const openApiResult = req.openApiResult;
  const linesArray = req.linesArray;
  let realTimeArray = await library.parseRealTime(openApiResult);
  realTimeArray = await sortRealTimeArray(realTimeArray);
  req.realTimeArray = realTimeArray;
  next();
};

export default getRealTime;
