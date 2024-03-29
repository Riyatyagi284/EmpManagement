export default function convertDate(date){
    const dateTime = new Date(date);
    let hr = dateTime.getHours()
    let min = dateTime.getMinutes()
    let day = dateTime.getDate()
    let month = dateTime.getMonth()
    let year = dateTime.getFullYear()
    let noon = "AM"
    month++
    if(hr > 12){
        hr = hr - 12
        noon = "PM"
    }
    if(min < 10){
        min = `0${min}`
    }
    if(day < 10){
        day = `0${day}`
    }
    if(month < 10){
        month = `0${month}`
    }

    return `${day}/${month}/${year} ${hr}:${min}${noon}`
}