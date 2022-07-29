const isStationName = async (stationIdOrName) => {
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(stationIdOrName)) {
        return true;
    } else {
        return false;
    }
}

export default isStationName;