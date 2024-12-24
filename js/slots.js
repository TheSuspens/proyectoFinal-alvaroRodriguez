export class SlotManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.slots = [];
    }

    async fetchSlots() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error("Error al cargar los turnos.");
            const data = await response.json();
            this.slots = data.turnos;
        } catch (error) {
            console.error(error);
        }
    }

    getAvailableSlots() {
        return this.slots.filter(slot => !slot.reservado);
    }

    addSlot(hora) {
        const newSlot = {
            id: this.slots.length + 1,
            hora,
            reservado: false
        };
        this.slots.push(newSlot);
    }
}
