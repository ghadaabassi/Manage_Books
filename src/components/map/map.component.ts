import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [GoogleMapsModule, CommonModule],
})
export class MapComponent {
  center = { lat: 40.7128, lng: -74.006 };
  zoom = 12;

  stores = [
    { id: 1, name: 'Store 1', lat: 40.7128, lng: -74.006 },
    { id: 2, name: 'Store 2', lat: 40.73061, lng: -73.935242 },
    { id: 3, name: 'Store 3', lat: 40.748817, lng: -73.985428 },
  ];

  display = {
    lat: 0,
    lng: 0,
    name: 'notfound',
  };

  onStoreClick(store: any) {
    this.display.lat = store.lat;
    this.display.lng = store.lng;
    this.display.name = store.name;
  }

  moveMap(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng) {
      this.display.lat = latLng.lat();
      this.display.lng = latLng.lng();
      this.display.name = 'Clicked Location';
    }
  }
}
