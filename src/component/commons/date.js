export let getDate = () => {
    let Data = new Date();
    let Year = Data.getFullYear();
    let Month = Data.getMonth();
    let Day = Data.getDate();
    let Hour = Data.getHours();
    let Minutes = Data.getMinutes();
    let Seconds = Data.getSeconds();
    return `${Year}.${Month}.${Day} ${Hour}:${Minutes}:${Seconds}`
}

export default getDate