var abb = "UT";
ns();
setInterval(ns, 10000);
async function ns() {
  // Departure info API
  var obj;
  const res = await fetch(
    "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?lang=english&station=" +
    abb +
    "&maxJourneys=10",
    {
      method: "GET",
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "d7a893b2c2e64d2595647e24f4b59fb2",
      },
    }
  );
  var info = await res.json();

  for (let i = 0; i < 10; i++) {
    console.log("Info below here");
    console.log(info);
    console.log(abb);
    let now = info.payload.departures[0].direction;
    console.log(typeof now);
    var departureArray = info.payload.departures;

    //destination
    let str_dep = info.payload.departures[i].direction;
    document.getElementById(i).innerHTML = str_dep;

    //train catagory
    let str_cat = info.payload.departures[i].product.categoryCode;

    if (str_cat == "IC") {
      document.getElementById(i).style.backgroundColor = "yellow";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "SPR") {
      document.getElementById(i).style.backgroundColor = "lightblue";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "ST") {
      document.getElementById(i).style.backgroundColor = "red";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "BUS") {
      document.getElementById(i).style.backgroundColor = "black";
      document.getElementById(i).style.color = "white";
    } else if (str_cat == "ICD") {
      document.getElementById(i).style.backgroundColor = "orange";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "ICE") {
      document.getElementById(i).style.backgroundColor = "green";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "THA") {
      document.getElementById(i).style.backgroundColor = "#750b0b";
      document.getElementById(i).style.color = "black";
    } else if (str_cat == "EST") {
      document.getElementById(i).style.backgroundColor = "#273163";
      document.getElementById(i).style.color = "black";
    } else {
      document.getElementById(i).style.backgroundColor = "grey";
      document.getElementById(i).style.color = "black";
    }
    // document.getElementById(i + "_cat").innerHTML = str_cat;

    //time
    let str_time = info.payload.departures[i].actualDateTime;
    str_time = str_time.slice(11, 19);
    document.getElementById(i + "_time").innerHTML = str_time;

    //platform
    let str_plat = info.payload.departures[i].actualTrack;

    if (str_plat !== undefined) {
      document.getElementById(i + "_plat").style.backgroundColor = "blue";
      document.getElementById(i + "_plat").style.color = "white";
      document.getElementById(i + "_plat").innerHTML = str_plat;
    } else {
      document.getElementById(i + "_plat").style.backgroundColor = "black";
      document.getElementById(i + "_plat").style.color = "white";
      document.getElementById(i + "_plat").innerHTML = "BUS";
    }


    //cancelled
    let cancel = (({ cancelled } = departureArray[i]), { cancelled });
    let planned_time =
      (({ plannedDateTime } = departureArray[i]), { plannedDateTime });

    if (cancel.cancelled == false) {
      document.getElementById(i + "_time").style.color = "green";
      // document.getElementById(i).style.backgroundColor = "white";
      document.getElementById(i + "_time").style.backgroundColor = "white";
      document.getElementById(i + "_time").style.color = "green";
      document.getElementById(i).style.color = "black";
    } else {
      document.getElementById(i).style.backgroundColor = "red";
      document.getElementById(i + "_time").style.backgroundColor = "red";
      document.getElementById(i + "_time").style.color = "white";
      document.getElementById(i + "_plat").innerHTML = "--";
      document.getElementById(i).style.color = "white";

    }
    let str_ptime = JSON.stringify(planned_time);
    str_ptime = str_ptime.split("T");
    str_ptime = str_ptime[2].split("+");
    str_ptime = str_ptime[0].replace('"}', "");
    if (str_ptime === str_time) {
    } else {
      let check_time = str_time.split(":");
      let pcheck_time = str_ptime.split(":");

      if (check_time[1] == pcheck_time[1]) {
        document.getElementById(i + "_time").style.color = "green";
      } else {
        document.getElementById(i + "_time").style.color = "red";
      }
    }

  }
}

// Station name API

function shortcut(sc_station, station_name) {
  abb = sc_station;
  document.getElementById("code").innerHTML = abb;
  document.getElementById("where").innerHTML = station_name;
  ns();
}

async function dep_station() {
  for (let i = 0; i < 10; i++) {
  document.getElementById(i).innerHTML = "Loading...";
  document.getElementById(i + "_time").innerHTML = "--";
  document.getElementById(i + "_plat").innerHTML = "--";
  }
  var dep_station = document.getElementById("dep_station").value;
  const station = await fetch(
    "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=" +
    dep_station +
    "&limit=1",
    {
      method: "GET",
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "d7a893b2c2e64d2595647e24f4b59fb2",
      },
    }
  );
  var name = await station.json();
  console.log(name);
  abb = name.payload[0].code;
  station_name = name.payload[0].mediumName;
  document.getElementById("where").innerHTML = dep_station + "  &nbsp &nbsp &nbsp ";
  document.getElementById("code").innerHTML = abb;
  for (let s = 0; s < 10; s++) {
    document.getElementById(s).innerHTML = "";
    document.getElementById(s + "_time").innerHTML = "";
    document.getElementById(s + "_plat").innerHTML = "";
    document.getElementById(s).style.backgroundColor = "";
    document.getElementById(s + "_time").style.backgroundColor = "";
    document.getElementById(s + "_plat").style.backgroundColor = "";

  }
  ns();
}
