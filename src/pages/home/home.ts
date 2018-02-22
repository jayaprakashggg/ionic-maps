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
  GoogleMapsAnimation
} from "@ionic-native/google-maps";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public platform: Platform) {}

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

      // Now you can use all methods safely.
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
    });
  }
}
