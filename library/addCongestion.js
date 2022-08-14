import { CongestionService } from '../services/congestion.js';
const congestionServiceInstance = new CongestionService();

const addCongestion = async (realTimeArray) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDay();
    const hour = now.getHours(); 
    const dayWeightedValue = [0.7, 1.1, 1.1, 1, 1, 1.2, 0.9];

    for (let i in realTimeArray) {
        const congestionData = await congestionServiceInstance.getCongestionByStationId(month, hour, realTimeArray[i].stationId);
        realTimeArray[i].congestion = Math.floor(congestionData.congestion * dayWeightedValue[day]);
    }
    
    return realTimeArray;
}
export default addCongestion;