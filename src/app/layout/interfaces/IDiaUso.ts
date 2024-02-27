import { IEventos } from "./IEventos";

export interface IDiaUso {
    diaObejto: Date;
    diaSemana: string;
    diaNumeroMensual: number;
    eventos: IEventos[];
  }