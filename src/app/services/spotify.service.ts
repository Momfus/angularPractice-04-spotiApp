import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Esto permite que no haga falta tener que traerlo como "provider" en app.module.ts  si lo saco hay que agregar
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify Service Listo!');

  }

  getNewReleases() {

    const headers = new HttpHeaders( {

        Authorization: 'Bearer BQDHbejvCrJ6ygL1xgsfeMrKDSTlfK3yOJxYtAvuQNIKBs7C8AE4c_hnEH1kXYFy4vPfMn0x6rb800zjUxs'

     } );

    this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
          .subscribe( data => {

            console.log(data);

          });

  }

}
