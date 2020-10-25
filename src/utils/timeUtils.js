function floorHour(date) {
    const newDate = new Date(date);
    newDate.setHours(date.getHours());
    newDate.setMinutes(0, 0, 0);

    return newDate;
}
function ceilHour(date) {
    const newDate = new Date(date);
    if (newDate.getMinutes() == 0){
        return newDate;
    }
    newDate.setHours(date.getHours()+1);
    newDate.setMinutes(0, 0, 0);

    return newDate;
}

export default {
    floorHour,
    ceilHour,
}