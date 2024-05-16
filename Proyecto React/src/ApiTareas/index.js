export const getTarea = async () => {
    const url = "http://localhost:3000/api/tasks";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log("Datos obtenidos:", data);
            return data;
        } else {
            console.error("Ocurrió un error");
            return [];
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const updateTarea = async (tarea) => {
    const url = `http://localhost:3000/api/tasks/${tarea.id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarea),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Tarea actualizada:", data);
            return data;
        } else {
            console.error("Ocurrió un error al actualizar la tarea");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
