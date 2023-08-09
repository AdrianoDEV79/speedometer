

const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()




allRides.forEach(async([id, value])=>{
    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", ()=> {
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationDate(firstPosition.latitude, firstPosition.longetude)

    const mapElement = document.createElement("div")
    mapElement.style = "width:100px;height:100px"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"
    
    const cityDiv = document.createElement("div")
    cityDiv.innerHTML = `Local: ${firstLocationData.city}-${firstLocationData.principalSubdivision}`
    cityDiv.className = "text-primary mb-1"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Veloc. Max.: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className ="h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distância: ${getDistance(ride.data)}`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duração: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "mt-2 text-secondary"

    
    
    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)
    
})

