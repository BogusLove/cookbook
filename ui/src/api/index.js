import api from './adapter';

export default {
    fetchAllRecipes: () => {
        return api.makeRequest(`/api/recipes`, api.requestType.GET);
    },
    addRecipe: recipe => {
        return api.makeRequest(`/api/recipes`, api.requestType.POST, recipe);
    },
    updateRecipe: recipe => {
        return api.makeRequest(`/api/recipes/${recipe._id}`, api.requestType.PATCH, recipe);
    },
    deleteRecipe: id => {
        return api.makeRequest(`/api/recipes/${id}`, api.requestType.DELETE);
    },
    fetchRecipe: id => {
        return api.makeRequest(`/api/recipes/${id}`, api.requestType.GET);
    },
    updateRating: recipe => {
        return api.makeRequest(`/api/recipes/${recipe._id}/rating`, api.requestType.PATCH, recipe);
    }
};