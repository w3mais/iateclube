import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Embarcacao } from '../models/embarcacao';


@Injectable()
export abstract class Service{

	private _headers = new Headers({'Content-Type': 'application/json'});
  	protected _url = 'http://w3mais.com.br/portaria-iate/app/';  // URL to web api
  	public resultado: any;

	constructor(private _http: Http){

	}
	
	public getAll(): Promise<any[]>{
		return this._http.get(this._url+"/get-all")
               .map(res => res.json())
               .toPromise()
               .then(resp => resp as any[] )
               .catch(this.handleError);
	}
	getOfId(id:number): Promise<any>{
		return this._http.get(this._url+"/get-of-id/"+id)
               .map(res => res.json())
               .toPromise()
               .then(resp => resp as any )
               .catch(this.handleError);
	}

	create(attributos: any): Promise<any>{
		return this._http
      		.post(this._url+"/create", JSON.stringify(attributos), {headers: this._headers})
      		.toPromise()
      		.then(res => res.json().data as any)
      		.catch(this.handleError);
	}

	update(atributos:any,id:number): Promise<any>{
		 return this._http
      		.put(this._url+"/update/"+id, JSON.stringify(atributos), {headers: this._headers})
      		.toPromise()
      		.then(() => atributos)
      		.catch(this.handleError);
	}
	
	delete(id:number){
		return this._http
			.delete(this._url+"/delete/"+id, {headers: this._headers})
      		.toPromise()
      		.then(() => null)
      		.catch(this.handleError);
	}

	getEmbarcacoes(idSocio:number): Promise<Embarcacao[]>{
		let url = this._url+"embarcacoes/"+idSocio;
		console.log(url);
		return this._http.get(url)
               .map(res => res.json())
               .toPromise()
               .then(embarcacoes => embarcacoes as Embarcacao[] )
               .catch(this.handleError);
	}

	/*setAgendamento(agendamento): Promise<Agendamento>{
		return this._http
	      .post(this._url, JSON.stringify({name: name}), {headers: this.headers})
	      .map(res => res.json())
	      .toPromise()
	      .then(res => res as Agendamento)
	      .catch(this.handleError);
	}*/

	
	private handleError(error: any): Promise<any> {
   		console.error('An error occurred', error); // for demo purposes only
    	return Promise.reject(error.message || error);
  	}
}