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

  getNewReleases() {

    const headers = new HttpHeaders( {

        Authorization: 'Bearer BQA-Io4yWSiVGd3pPEhOtzEBpH8BV6dncR5Oui1XS0iztH0dzvA9ArA5dtZzRVBtX05rZ5OdMNcz1U22X5s'

     } );

    return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
                  .pipe( map( data => {
                      // tslint:disable-next-line: max-line-length
                      return data['albums'].items; // Esto es válido pero tambien se puede hacer data.albums.items y en map poner ( data: any )
                  } ) );

  }

  getArtista( termino: string )  {

    const headers = new HttpHeaders( {

      Authorization: 'Bearer BQA-Io4yWSiVGd3pPEhOtzEBpH8BV6dncR5Oui1XS0iztH0dzvA9ArA5dtZzRVBtX05rZ5OdMNcz1U22X5s'

     } );

    return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
                  .pipe( map( data => data['artists'].items ) ); // Si es una sola línea del return, se simplifica asi si se quiere

  }

}
