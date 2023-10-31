
export const statusOptions = [
    {label: 'Active', value: 1},
    {label: 'Inactive', value: 0},
    {label: 'All', value: -1}
];

export function getCorrectDateTime(datetime, withoutTime)
{
    let utcDate
    if(!datetime) return 
    
    if(datetime.indexOf('Z') > -1){
        utcDate = new Date(datetime.slice(0,19));
    }else{
        utcDate = new Date(datetime);
    }

    // Get the timezone offset in minutes
    const timezoneOffset = new Date().getTimezoneOffset();

    // Convert the offset to milliseconds
    const offsetInMs = timezoneOffset * 60 * 1000;

    // Add the offset to the UTC time
    const localTime = new Date(utcDate.getTime() - offsetInMs);
 
    // Format the local time as a string in the YYYY-MM-DD HH:MM:SS format
    const year = localTime.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, '0');
    const day = String(localTime.getDate()).padStart(2, '0');
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
    let localTimeString
    if(withoutTime){
        localTimeString = `${year}-${month}-${day}`;
    }else{
        localTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return localTimeString;
}