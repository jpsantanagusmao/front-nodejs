import { Component, Input, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-points-generate',
    templateUrl: './points-generate.component.html',
    styleUrls: ['./points-generate.component.css']
}) 
export class PointsGenerateComponent implements OnInit {

    confirmResult: Subject<google.maps.Marker>;

    @Input() title: string = 'Indicar localização';

    map: google.maps.Map;
    markers: google.maps.Marker[] = [];

    loader = new Loader(new Loader({
        // apiKey: "AIzaSyDFNduhX4rEk8BfLfv6GjuFWY9_2S11mI4",
        apiKey: "AIzaSyDqT3Ei9ek7G2avN-HwAiZwyKcBayrSOzc",
    }));

    public constructor(
        public bsModalRef: BsModalRef
    ) {
    }

    public async ngOnInit() {
        this.confirmResult = new Subject();
        const obj = this;

        await navigator.geolocation.getCurrentPosition((p) => {
            obj._loadMap(p)
        }, (err) => {
            console.log(err)
            obj._loadMap(null);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        )
    }

    private _loadMap(point) {
        const obj = this;
        
        let pc;
        
        if(point){
            pc = { lat: point['coords'].latitude, lng: point['coords'].longitude }
        }else{
            pc = { lat: -19.46545, lng: -42.4148877 }
        }
        //center: { lat: point['coords'].latitude, lng: point['coords'].longitude },
        this.loader.load().then(() => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: pc,
                zoom: 10,
                streetViewControl: false
            });

            this.map.addListener("click", (lc) => {
                obj._placeMarkerAndPanTo(lc.latLng);
            });

        })

    }

    private _placeMarkerAndPanTo(latLng: google.maps.LatLng) {

        this.markers.map(m => {
            m.setMap(null);
        });

        const marker = new google.maps.Marker({
            position: latLng,
        });

        this.markers[0] = marker;

        this.markers[0].setMap(this.map);
        this.map.panTo(latLng);

    }
    public ngAfterViewInit() {

    }
    onConfirm() {
        this._confirmAndClose(this.markers);
    }
    onClose() {
        this._confirmAndClose(undefined);
    }

    private _confirmAndClose(value: google.maps.Marker[]) {
        try{
            this.confirmResult.next(value[0]);
        }catch (e){
            this.confirmResult.next(undefined);
        }
        
        this.bsModalRef.hide();

    }
}