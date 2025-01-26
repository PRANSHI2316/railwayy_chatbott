// script.js
const trainData = {
    trains: [
      {
        train_number: "101",
        train_name: "Express 101",
        route: {
          from: "New York",
          to: "Washington DC",
          stations: [
            { station: "New York", departure_time: "08:00 AM" },
            { station: "Philadelphia", arrival_time: "09:30 AM", departure_time: "09:45 AM" },
            { station: "Baltimore", arrival_time: "10:30 AM", departure_time: "10:45 AM" },
            { station: "Washington DC", arrival_time: "11:15 AM" }
          ]
        },
        train_type: "Express",
        coach_classes: ["Economy", "Business"],
        amenities: ["Wi-Fi", "Air Conditioning", "Food Service"]
      },
      {
        train_number: "202",
        train_name: "Sunset Special",
        route: {
          from: "Chicago",
          to: "Los Angeles",
          stations: [
            { station: "Chicago", departure_time: "07:00 PM" },
            { station: "St. Louis", arrival_time: "11:00 PM", departure_time: "11:15 PM" },
            { station: "Kansas City", arrival_time: "01:30 AM", departure_time: "01:45 AM" },
            { station: "Denver", arrival_time: "05:00 AM", departure_time: "05:15 AM" },
            { station: "Los Angeles", arrival_time: "10:00 AM" }
          ]
        },
        train_type: "Night",
        coach_classes: ["Sleeper", "Business", "Economy"],
        amenities: ["Sleeping Pods", "Wi-Fi", "Restaurant Car"]
      },
      {
        train_number: "303",
        train_name: "Northern Star",
        route: {
          from: "San Francisco",
          to: "Seattle",
          stations: [
            { station: "San Francisco", departure_time: "09:00 AM" },
            { station: "Portland", arrival_time: "01:30 PM", departure_time: "01:45 PM" },
            { station: "Seattle", arrival_time: "04:00 PM" }
          ]
        },
        train_type: "Scenic",
        coach_classes: ["Economy", "First Class"],
        amenities: ["Scenic Views", "Wi-Fi", "Food Service"]
      }
    ]
  };
  
  // Function to fetch trains by source and destination
  function getTrainsBySourceAndDestination(source, destination) {
    return trainData.trains.filter(train => {
      const { from, to } = train.route;
      return from.toLowerCase() === source.toLowerCase() && to.toLowerCase() === destination.toLowerCase();
    });
  }
  
  // Function to display train results
  function displayTrains(trains) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results
  
    if (trains.length === 0) {
      resultsContainer.innerHTML = `<p class="no-results">No trains available for the given source and destination.</p>`;
      return;
    }
  
    trains.forEach(train => {
      const trainDiv = document.createElement("div");
      trainDiv.classList.add("train");
  
      trainDiv.innerHTML = `
        <h2>${train.train_name} (Train No: ${train.train_number})</h2>
        <p><strong>Route:</strong> ${train.route.from} to ${train.route.to}</p>
        <p><strong>Train Type:</strong> ${train.train_type}</p>
        <p><strong>Coach Classes:</strong> ${train.coach_classes.join(", ")}</p>
        <p><strong>Amenities:</strong> ${train.amenities.join(", ")}</p>
        <p><strong>Stations along the route:</strong></p>
        <ul class="stations">
          ${train.route.stations
            .map(
              station =>
                `<li>${station.station} (Departure: ${station.departure_time || "N/A"}, Arrival: ${station.arrival_time || "N/A"})</li>`
            )
            .join("")}
        </ul>
      `;
  
      resultsContainer.appendChild(trainDiv);
    });
  }
  
  // Event listener for the search button
  document.getElementById("search-btn").addEventListener("click", () => {
    const source = document.getElementById("source").value.trim();
    const destination = document.getElementById("destination").value.trim();
  
    if (!source || !destination) {
      alert("Please enter both source and destination stations.");
      return;
    }
  
    const trains = getTrainsBySourceAndDestination(source, destination);
    displayTrains(trains);
  });
  