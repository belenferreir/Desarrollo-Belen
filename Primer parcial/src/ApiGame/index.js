export const getJuegos = async () => {
    const url = "http://localhost:3000/api/games";
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

export const updateJuegos = async (juegos) => {
    const url = `http://localhost:3000/api/games/${juegos.id}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(juegos),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Juego actualizado:", data);
            return data;
        } else {
            console.error("Ocurrió un error al actualizar el juego");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
