const correctArriveInfo = async (realTimeArray) => {
    const now = new Date();
    for (let i in realTimeArray) {
        const generate = new Date(realTimeArray[i].updatedAt);
        const gapTime = Math.floor((now - generate) / 1000);
        const arriveTime = parseInt(realTimeArray[i].arriveTime);
        const correctArriveTime = arriveTime - gapTime;
        realTimeArray[i].arriveTime = String((correctArriveTime >= 0) ? correctArriveTime : 0);
    }
    return realTimeArray;
}
export default correctArriveInfo;