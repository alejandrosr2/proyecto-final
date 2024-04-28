

const getDataApi = async() => {
    const dataApi = await fetch("https://api.coincap.io/v2/assets");
    const recipes = await dataApi.json();
    return recipes;

    
};

const api = {
    getDataApi,
}

export default api;


