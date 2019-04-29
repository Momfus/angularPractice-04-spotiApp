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

      Authorization: 'Bearer BQDxSxUBkk-hi9JzV95wcD4G-195bzfKSzJweCTvdpBIAQlwjnT6VVGIQSE4adSjw1CM9z9uim6ioRJ3LZk'

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
