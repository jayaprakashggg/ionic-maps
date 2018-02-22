import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Platform } from "ionic-angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from "@ionic-native/google-maps";
import { LocationAccuracy } from "@ionic-native/location-accuracy";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: GoogleMap;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private locationAccuracy: LocationAccuracy
  ) {}

  ionViewDidLoad() {
    this.platform.ready().then(readySource => {
      console.log("Platform ready from", readySource);
      this.loadMap();
    });
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 11.0168,
          lng: 76.9558
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("Map is ready!");
      this.pointLocation();
      setTimeout(() => {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if (canRequest) {
            this.locationAccuracy
              .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
              .then(
                () => {
                  this.focusCurrentLocation();
                  console.log("Request successful");
                },
                error => {
                  console.log("Error requesting location permissions", error);
                }
              );
          }
        });
      }, 3000);
    });
  }

  focusCurrentLocation() {
    this.map
      .getMyLocation()
      .then(
        (location: MyLocation) => {
          console.log(JSON.stringify(location, null, 2));
          return this.map
            .animateCamera({
              target: location.latLng,
              zoom: 17,
              tilt: 30
            })
            .then(() => {
              return this.map.addMarker({
                title: "@ionic-native/google-maps current location",
                snippet: "Probeseven",
                position: location.latLng,
                animation: GoogleMapsAnimation.BOUNCE
              });
            });
        },
        error => {}
      )
      .then((marker: Marker) => {
        marker.showInfoWindow();
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert("clicked!");
        });
      });
  }

  pointLocation() {
    this.map
      .addMarker({
        title: "Ionic",
        icon: "blue",
        animation: "DROP",
        position: {
          lat: 11.0168,
          lng: 76.9558
        }
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert("clicked");
        });
      });
  }
}
