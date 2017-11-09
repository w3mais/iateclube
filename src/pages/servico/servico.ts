import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Service } from '../../app/service';
import { Embarcacao } from '../../models/embarcacao';



@Component({
	templateUrl: 'servico.html'
})
export class ServicoPage implements OnInit{
	
	public servico;
	public data;
	public horarios = [];
	public agendamentos;
	public embarcacoes: Embarcacao[];


	constructor(
		public navParams: NavParams,
		private _loadingCtrl: LoadingController,
		private _alertCtrl: AlertController,
		private _http: Http,
		private _service: Service

	){
		
		this.servico = this.navParams.get('servico');

		let data = new Date();
		this.data = data.getFullYear()+"-"+("0"+(data.getMonth()+1)).slice(-2)+"-"+data.getDate();
		

	}

	getHorarios(agendamentos){
		type agenda = {
			hora:string,
			status:string,
			color: string
		};
		let a:agenda;
		let i = 0;
		let horarios = [];
		
		for (let h = 7; h <= 17; h++) {
			for (let m = 0; m <= 55; m=m+5) {
				
				a = {hora: h+":"+("0"+m).slice(-2),status:  'Livre',color: 'secondary'};

				horarios[i] = a;
				for (let agenda of agendamentos){
					if(agenda.reserva == this.data+" "+a.hora+":00"){
						a = {hora: h+":"+("0"+m).slice(-2),status:  'Ocupado', color:'light'};
						horarios[i] = a;
						horarios.pop();
						i = i - 1;
					}					
				}
								
				i = i + 1;
			}				
		}
		return horarios;
	}

	selecionarHorario(horario){
		if(horario.status == 'Ocupado'){
			this._alertCtrl.create({
	  			title: 'Horário Ocupado',
	  			buttons: [{text: 'Estou Ciente'}],
	  			subTitle: 'Esse horário já foi reservado.'
	  		}).present();
		}else{
			
		}
		
	}

	ngOnInit(){
	  	let loader = this._loadingCtrl.create({
	  		content: 'Carregando...'
	  	});

	  	loader.present();

	  	this._http
	  	.get('http://w3mais.com.br/portaria-iate/app/agendamentos/'+this.data)
	  	.map(res => res.json()).toPromise()
	  	.then(agendamentos => { 
	  		this.agendamentos = agendamentos;
	  		this.horarios = this.getHorarios(this.agendamentos);
	  		

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

	  	this.getEmbarcacoes();
	  	
	}

	getEmbarcacoes():void{
		this._service.getEmbarcacoes(23).then(embarc => {
	  		console.log(embarc);
	  		this.embarcacoes = embarc;
	  	});
	}

}