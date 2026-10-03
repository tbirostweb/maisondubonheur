/* Formatage FR partagé */

// Note Booking sur 10, toujours avec une décimale : 9 → "9,0"
export const note10 = (n) => Number(n).toFixed(1).replace('.', ',')
