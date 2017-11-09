import { Service } from '../app/service';

export class Servico extends Service{
  id: number;  
  nome: string;
  descricao: string;

  protected _url:string = 'http://w3mais.com.br/portaria-iate/app/servicos';
}