import { SlotManager } from "./slots.js";
import { ReservationManager } from "./reservaciones.js";

document.addEventListener("DOMContentLoaded", async () => {
    const slotManager = new SlotManager("./data/api.json");
    const reservationManager = new ReservationManager();

    const slotsContainer = document.getElementById("available-slots");
    const reservationsList = document.getElementById("reservations-list");
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
    const userNameInput = document.getElementById("user-name");
    const userLastnameInput = document.getElementById("user-lastname");
    const addTurnoForm = document.getElementById("add-turno-form");
    const newTurnoInput = document.getElementById("new-turno");
    let selectedSlot = null;

    const renderSlots = () => {
        slotsContainer.innerHTML = "";
        slotManager.getAvailableSlots().forEach(slot => {
            const slotDiv = document.createElement("div");
            slotDiv.className = "col-md-4 slot";
            slotDiv.textContent = slot.hora;

            slotDiv.addEventListener("click", () => {
                selectedSlot = slot;
                confirmModal.show();
            });

            slotsContainer.appendChild(slotDiv);
        });
    };

    const renderReservations = () => {
        reservationsList.innerHTML = "";
        reservationManager.getReservations().forEach(reservation => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.textContent = `${reservation.nombre} ${reservation.apellido} - ${reservation.hora}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar";
            removeButton.className = "btn btn-danger btn-sm";
            removeButton.addEventListener("click", () => {
                reservationManager.removeReservation(reservation.id);
                renderSlots();
                renderReservations();
            });

            li.appendChild(removeButton);
            reservationsList.appendChild(li);
        });
    };

    document.getElementById("confirm-reservation").addEventListener("click", () => {
        const nombre = userNameInput.value.trim();
        const apellido = userLastnameInput.value.trim();

        if (nombre && apellido) {
            reservationManager.addReservation({ ...selectedSlot, nombre, apellido });
            selectedSlot.reservado = true;
            renderSlots();
            renderReservations();
            confirmModal.hide();
            userNameInput.value = "";
            userLastnameInput.value = "";
        }
    });

    addTurnoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTurno = newTurnoInput.value.trim();

        if (newTurno) {
            slotManager.addSlot(newTurno);
            renderSlots();
            newTurnoInput.value = "";
        } else {
            alert("Por favor, ingresa un turno válido.");
        }
    });

    await slotManager.fetchSlots();
    renderSlots();
    renderReservations();
});
