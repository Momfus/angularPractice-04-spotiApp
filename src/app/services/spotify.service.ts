import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Esto permite que no haga falta tener que traerlo como "provider" en app.module.ts  si lo saco hay que agregarlo en provider en app.module
})
export class SpotifyService {

  constructor( private http: HttpClient ) {

    console.log('Spotify Service Listo!');

  }

  getQuey( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders( {

      Authorization: 'Bearer BQAClEc1xWBckM9gSrWs2sUT9Q0h2Fa3W6DjeUN98Cu2Vz23N69wTBYrq4gNdMRHVIOCa6IMX9sOFe_F3ns'

     } );

    return this.http.get(url, { headers });

  }

  getNewReleases() {

    return this.getQuey('browse/new-releases?limit=20')
                    .pipe( map( data => {
                      // tslint:disable-next-line: max-line-length
                      return data['albums'].items;
                    } ) );

  }

  getArtista( termino: string )  {

    return this.getQuey(`search?q=${ termino }&type=artist&limit=15`)
                    .pipe( map( data => data['artists'].items ) ); // Si es una sola línea del return, se simplifica asi si se quiere

  }

}
