import { Service } from '../app/service';

export class Embarcacao extends Service{
  
  id: number;
  socio_id: number;
  nome: string;
  tipo: string;

  protected _url:string = 'http://w3mais.com.br/portaria-iate/app/embarcacoes';
}