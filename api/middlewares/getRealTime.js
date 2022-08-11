import library from '../../library/index.js'

const getRealTime = async (req, res, next) => {
  const openApiResult = req.openApiResult;
  let realTimeArray = await library.parseRealTime(openApiResult);
  realTimeArray = await library.addCongestion(realTimeArray);
  realTimeArray = await library.correctArriveInfo(realTimeArray);
  realTimeArray = await library.sortRealTimeArray(realTimeArray);
  req.realTimeArray = realTimeArray;
  next();
};

export default getRealTime;
