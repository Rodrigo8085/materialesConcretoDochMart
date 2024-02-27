export function obtenerYear(dia: Date): string {
    return dia ? dia?.getFullYear()?.toString() : '';
}