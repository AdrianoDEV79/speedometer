

function CreateNewRide() {
    const rideID = Date.now();
    const rideRecords = {
        data: [],
        startTime: rideID,
        stopTime: null
    }
    saveRideRecords(rideID, rideRecords)
    return rideID
}

function getRideRecords(rideID) {
    return JSON.parse(localStorage.getItem(rideID))
}

function saveRideRecords(rideID, rideRecords) {
    localStorage.setItem(rideID, JSON.stringify(rideRecords))
}

function getAllRides(){
   return Object.entries(localStorage)
}

function deleteRide(rideID){
    localStorage.removeItem(rideID)
}


function addPosition(rideID, position) {
    const rideRecords = getRideRecords(rideID)
    const newDate = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timesTamp: position.timestamp
    }
    rideRecords.data.push(newDate)
    saveRideRecords(rideID, rideRecords)
}

function updateStopTime(rideID) {
    const rideRecords = getRideRecords(rideID)
    rideRecords.stopTime = Date.now()
    saveRideRecords(rideID, rideRecords)
}