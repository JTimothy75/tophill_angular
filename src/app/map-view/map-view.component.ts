import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MapDataService } from "./map-data.service";
import * as L from "leaflet";
import { IGeodata } from "./geodata";
import { AuthService } from "../user/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.css"]
})
export class MapViewComponent implements AfterViewInit, OnInit {
  coordSource = "UseGeolocation";
  inputCoord: any;
  useGeolocation: any;
  lat: any;
  lng: any;

  floodGeodatas: IGeodata;
  floodProneGeodatas: IGeodata;
  elevenLGAGeodatas: IGeodata;
  wardGeodatas: IGeodata;
  errorMessage: string;
  floodInfoResult: { history: string; proneOrNot: string };

  private map;
  tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  legend = L.control({ position: "bottomright" });

  private initMap(): void {
    this.map = L.map("map", {
      center: [7.41352, 3.90173],
      zoom: 10
    });
  }

  constructor(
    private mapDataService: MapDataService,
    public auth: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // this.cookieService.set('cookie-name', '')
  }

  getFloodInfo = value => {
    console.log(value);
    if (value.coordSource === "InputCoord") {
      if (value.lat && value.lng) {
        this.zoomToLocationAndGetFloodInfo(value.lat, value.lng);
      } else {
        alert("Please Input Latitude and longitude");
      }
    } else if (value.coordSource === "UseGeolocation") {
      this.getPosition();
    } else {
      alert("Please select location source");
    }
  };

  options: {
    timeout: 5000;
    enableHighAccurcy: true;
    maximumAge: 1000;
  };

  getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.errorCallback,
        this.options
      );
    } else {
      alert("Sorry, geolocation is not supported");
    }
  };

  showPosition = position => {
    console.log("getting location");
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    console.log(lat, lng);
    this.zoomToLocationAndGetFloodInfo(lat, lng);
  };

  errorCallback = () => {
    console.log("Sorry, something when wrong, we can't find your location");
    alert("Sorry, something when wrong, we can't find your location");
  };

  zoomToLocationAndGetFloodInfo(lat, lng) {
    let circle = L.circle([lat, lng], {
      color: "blue",
      fillColor: "#f03",
      fillOpacity: 0.8,
      radius: 20
    }).addTo(this.map);
    let marker = L.marker([lat, lng]).addTo(this.map);
    circle.bindPopup("Your Location.");
    this.map.setView([lat, lng], 15);

    if (this.auth.isAuthenticated()) {
      this.mapDataService.getFloodPronePlusHistory(lat, lng).subscribe({
        next: floodInfoResult => {
          this.floodInfoResult = floodInfoResult.data.floodProne[0].proneArea;
          console.log(this.floodInfoResult);
        },
        error: err => (this.errorMessage = err)
      });
    } else if (!this.auth.isAuthenticated()) {
      this.mapDataService.getFloodProne(lat, lng).subscribe({
        next: floodInfoResult => {
          this.floodInfoResult = floodInfoResult.data.floodProne[0].proneArea;
          console.log(this.floodInfoResult);
        },
        error: err => (this.errorMessage = err)
      });
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.tiles.addTo(this.map);

    this.legend.onAdd = function(map: any) {
      let div = L.DomUtil.create("div", "legend");
      let labels = ["L.G.A", "Ward", "Flood prone area"];
      let grades = ["#0f0", "#00f", "#f00"];
      div.innerHTML = "<div><b>Legend</b></div>";
      // grades.forEach(el => {
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          "<div>" +
          '<i class="' +
          grades[i] +
          '" style="border: 2px solid' +
          grades[i] +
          '">&nbsp;&nbsp;</i>&nbsp;&nbsp;' +
          labels[i] +
          "</div>";
      }
      return div;
    };

    this.legend.addTo(this.map);

    this.mapDataService.getElevenLGA().subscribe({
      next: elevenLGAGeodatas => {
        this.elevenLGAGeodatas = elevenLGAGeodatas;
        L.geoJSON(this.elevenLGAGeodatas.data.geodata, {
          style: function(feature: any) {
            return {
              color: "#0f0",
              weight: 3
            };
          }
        }).addTo(this.map);
      },
      error: err => (this.errorMessage = err)
    });

    this.mapDataService.getWard().subscribe({
      next: wardGeodatas => {
        this.wardGeodatas = wardGeodatas;
        // console.log(this.wardGeodatas.data.geodata);

        L.geoJSON(this.wardGeodatas.data.geodata, {
          style: function(feature: any) {
            return {
              // color: "#0f0",
              weight: 0.5
            };
          }
        })
          .bindPopup(function(layer: any) {
            return layer.feature.geometry.area_name;
          })
          .addTo(this.map);
      },
      error: err => (this.errorMessage = err)
    });

    this.mapDataService.getFloodProneArea().subscribe({
      next: floodGeodatas => {
        this.floodGeodatas = floodGeodatas;
        // console.log(this.floodGeodatas.data.geodata);

        L.geoJSON(this.floodGeodatas.data.geodata, {
          style: function(feature: any) {
            return {
              color: "#f00",
              weight: 0.5
            };
          }
        }).addTo(this.map);
      },
      error: err => (this.errorMessage = err)
    });
  }
}
