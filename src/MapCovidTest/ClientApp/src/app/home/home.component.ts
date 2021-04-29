import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VoxelmapMapService } from '../services/voxelmap-map.service';
import { environment } from '../../environments/environment';
import * as L from 'leaflet';
import {CovidResponse, Feature } from '../models/covid-service-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private covidMap: any;
  //public hasLoaded = false;
  constructor(private mapService: VoxelmapMapService) { }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.GetPanelInfo();
   
    
  }

  private initMap() {
    //this.covidMap = L.map('map').setView([19.4978, -99.1269], 5);
    this.covidMap = L.map('map').setView([0, 0], 0);
    const tiles = L.tileLayer(environment.leafetTiles, {
      maxZoom: 6,
      minZoom: 2,
      zoomSnap: 0.25
    });
    tiles.addTo(this.covidMap); 
  }

  GetPanelInfo() {
    this.mapService.GetCovidInfonew().subscribe((r: CovidResponse) => {

      console.log(r.features);

      this.addMarkers(r.features);

    });
  }

  private addMarkers(countries: Array<Feature>): void {

    this.mapService.addMarkers(this.covidMap, countries);

  }
}
