export const getCats = async () => {
    const url = "https://api.thecatapi.com/v1/images/search?limit=10";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const load = await response.json();
            return load;
        } else {
            console.error("Ocurrió un error");
            return [];
        }
    }
    catch (error) {
        console.error(error);
    }
}