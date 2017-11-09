import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ServicoPage } from '../servico/servico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{
  
  public servicos;	
  
  constructor(
  	public navCtrl: NavController,
  	private _http: Http,
  	private _loadingCtrl: LoadingController,
  	private _alertCtrl: AlertController
  ) {  	
  	
  }

  selecionarServico(servico){
  	this.navCtrl.push(ServicoPage, {servico: servico});
  }

  ngOnInit(){
  	let loader = this._loadingCtrl.create({
  		content: 'Carregando...'
  	});

  	loader.present();

  	this._http
  	.get('http://w3mais.com.br/portaria-iate/app/servicos/get-all')
  	.map(res => res.json()).toPromise()
  	.then(servicos => { 
  		this.servicos = servicos;
  		loader.dismiss()
  	}, 
  	err => {
  		loader.dismiss()
  		console.log(err);
  		this._alertCtrl.create({
  			title: 'Falha na Conexão',
  			buttons: [{text: 'Estou Ciente'}],
  			subTitle: 'Não possível a conexão com a Internet'
  		}).present();
  	});
  }

}
