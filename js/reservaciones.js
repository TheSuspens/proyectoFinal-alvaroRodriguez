export class ReservationManager {
    constructor() {
        this.reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    }

    addReservation(slot) {
        this.reservations.push(slot);
        localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }

    getReservations() {
        return this.reservations;
    }

    removeReservation(id) {
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
        localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
}
