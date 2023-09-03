import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare global {
  interface Window {
    initMap: () => void;
  }
}

@Component({
  selector: 'app-gym-locations',
  templateUrl: './gym-locations.component.html',
  styleUrls: ['./gym-locations.component.css']
})

export class GymLocationsComponent implements OnInit {
  map!: google.maps.Map;
  service: google.maps.places.PlacesService | undefined;
  infowindow: google.maps.InfoWindow | undefined;
  location!: google.maps.LatLngLiteral;

  isLoading: boolean = false;
  selectedSport: string = "gym";

  constructor( public translate: TranslateService,){

  }

  ngOnInit() {
    this.isLoading = true;
    this.getLocations(this.selectedSport);
  }

  initMap(query?: string) {
    const request = {
      query: query,
      location: this.location,
      radius: 500
    };

    this.service = new google.maps.places.PlacesService(this.map);

    this.service.textSearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
            }
            this.isLoading = false;
          }
        }
      );
  }

  createMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) 
      return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "mouseover", () => {
      this.infowindow!.setContent(place.name || "");
      this.infowindow!.open(this.map, marker);
    });

    google.maps.event.addListener(marker, "mouseout", () => {
      this.infowindow!.close();
    });
  }

  getLocations(query: string) {
    // get current location
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.infowindow = new google.maps.InfoWindow();

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: this.location,
        zoom: 15,
      });

      // start finding gym locations
      this.initMap(query);
      window.initMap = this.initMap;
    });
  }

  changeSport(sport: string){
    this.selectedSport = sport;
    this.isLoading = true;
    this.getLocations(sport);
  }
}


