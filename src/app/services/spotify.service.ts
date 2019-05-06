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

      Authorization: 'Bearer BQAuiFRxaKPbKConk9Kx5IFATAzAyivCuiHi2wOL5HCyAfCFPqbAoBdLj-YC4Mqv3bdh_-hzfPBrXofPVpM'

     } );

    return this.http.get(url, { headers });

  }

  getNewReleases() {

    return this.getQuey('browse/new-releases?limit=20')
                    .pipe( map( data => {
                      return data['albums'].items;
                    } ) );

  }

  getArtistas( termino: string )  {

    return this.getQuey(`search?q=${ termino }&type=artist&limit=15`)
                    .pipe( map( data => data['artists'].items ) ); // Si es una sola línea del return, se simplifica asi si se quiere

  }

  getArtista( id: string )  {

    return this.getQuey(`artists/${id}`);
                   // .pipe( map( data => data['artists'].items ) ); // No hace falta aca porque la información ya viene como se necesita

  }

  getTopTracks( id: string )  {

    return this.getQuey(`artists/${id}/top-tracks?country=us`)
                   .pipe( map( data => data['tracks'] ) ); // No hace falta aca porque la información ya viene como se necesita

  }

}
