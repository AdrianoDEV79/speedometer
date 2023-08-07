async function getLocationDate(latitude, longetude){

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longetude=${longetude}&localityLanguage=pt-BR`
    const response = await fetch(url)
    return await response.json()
}

function getMaxSpeed(positions){
    let maxSpeed = 0
    positions.forEach(position=>{
        if(position.speed !=null && position.speed > maxSpeed)
        maxSpeed = position.speed
    })
    return (maxSpeed * 3.6).toFixed(1)
}

function getDistance(positions){
    const earthRadiusKm = 6371
    let totalDistance = 0
    for(let i = 0; i<positions.length - 1; i++){
        const p1 = {
            latitude:positions[i].latitude,
            longetude:positions[i].longetude
        }
        const p2 = {
            latitude:positions[i + 1].latitude,
            longetude:positions[i + 1].longetude
        }
        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongetude = toRad(p2.longetude - p1.longetude)

        const a = Math.sin(deltaLatitude/2)*Math.sin(deltaLatitude/2) + 
                  Math.sin(deltaLongetude/2)*Math.sin(deltaLongetude/2) *
                  Math.cos(toRad(p1.latitude)) * Math.cos(toRad(p2.longetude))
        const c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        const distance = earthRadiusKm * c

        totalDistance += distance

    }
    function toRad(degree){
        return degree*Math.PI / 180
    }

    return totalDistance.toFixed(2)
}

function getDuration(ride){

    function format(number, digits){
        return String(number.toFixed(0)).padStart(2,'0')
    }

    const interval = (ride.stopTime - ride.startTime) / 1000 
    const minutes = Math.trunc(interval / 60)
    const seconds = interval % 60
    return `${format(minutes,2)}:${format(seconds,2)}`
}

function getStartDate(ride){
    const d = new Date(ride.startTime)

    const day = d.toLocaleString("pt-BR", {day:"numeric"})
    const month = d.toLocaleString("pt-BR", {month:"long"})
    const year = d.toLocaleString("pt-BR", {year:"numeric"})
    const hour = d.toLocaleString("pt-BR", {hour:"2-digit"})
    const minute = d.toLocaleString("pt-BR", {minute:"2-digit"})

    return `${day} ${month} ${year} - ${hour}:${minute}`
}


function cleanStorage(){
    if(confirm("Deseja limpar o historico?"))    
    localStorage.clear();
    window.location.reload();
}