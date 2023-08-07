const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecords(rideID)




document.addEventListener("DOMContentLoaded", async () => {

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationDate(firstPosition.latitude, firstPosition.longetude)

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div")
    cityDiv.innerHTML = `Local: ${firstLocationData.city}-${firstLocationData.principalSubdivision}`
    cityDiv.className = "text-primary mb-1"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Veloc. Max.: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distância: ${getDistance(ride.data)}`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duração: ${getDuration(ride.data)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "mt-2 text-secondary"



    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)


    document.querySelector("#data").appendChild(dataElement)


    const deleteBtn = document.querySelector("#deleteBtn")

    deleteBtn.addEventListener("click", () => {
        deleteRide(rideID)
        window.location.href = "./"
    })

    const lat = firstPosition.latitude;
    const lon = firstPosition.longetude;
    

    const map = L.map('mapDetail').setView([lat, lon], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    const positionsArray = ride.data.map((position => {
        return [lat, lon]
    }))

    const polyline = L.polyline(positionsArray, "#F00")
    polyline.addTo(map)
    map.fitBounds(polyline.getBounds())

})