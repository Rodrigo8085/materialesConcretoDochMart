import { nombreMes } from "../nombreMes";

export function obtenerMes(dia: Date): string {
    return dia ? nombreMes[dia?.getMonth()] : '';
  }