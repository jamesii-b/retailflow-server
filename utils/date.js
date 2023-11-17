

function getymd() {

    const now = new Date();
    // console.log(now)
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDay();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}



function areDatesEqual(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    // Extract year, month, and day components
    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth();
    const day1 = date1.getUTCDay();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDay();
    return year1 === year2 && month1 === month2 && day1 === day2;
}
function areHourEqual(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    // Extract year, month, and day components
    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth();
    const day1 = date1.getUTCDay();
    const hour1 = date1.getUTCHours();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDay();
    const hour2 = date2.getUTCHours();

    // Compare year, month, and day components

    if( year1 === year2 && month1 === month2 && day1 === day2 && hour1 === hour2){
        return true;
    }else{
        return false
    }
}


module.exports = { getymd, areDatesEqual, areHourEqual };

