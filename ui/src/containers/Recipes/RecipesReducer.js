import * as constants from './RecipesConstants';
import { combineReducers } from 'redux';

const initialState = {
    byId: {},
    all: [],
    isFetching: false,
    active: null
};

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case constants.FETCH_ALL_RECIPES_SUCCESS:
            return action.payload.byId;
        case constants.UPDATE_RECIPE_SUCCESS:
        case constants.UPDATE_RATING_SUCCESS:
        case constants.FETCH_RECIPE_SUCCESS:
            return { 
                ...state, 
                [action.payload._id]: action.payload 
            };
        default:
            return state;
    }
};

const all = (state = initialState.all, action) => {
    switch (action.type) {
        case constants.FETCH_ALL_RECIPES_SUCCESS:
            return action.payload.all;
        case constants.DELETE_RECIPE_SUCCESS:
            return state.filter(id => id !== action.payload.id);
        default:
            return state;

    }
};

const isFetching = (state = initialState.isFetching, action) => {
    switch (action.type) {
        case constants.FETCH_ALL_RECIPES:
        case constants.FETCH_RECIPE:
        case constants.ADD_RECIPE:
        case constants.UPDATE_RECIPE:
        case constants.DELETE_RECIPE:
        case constants.UPDATE_RATING:
            return true;
        case constants.FETCH_ALL_RECIPES_FAILED:
        case constants.FETCH_ALL_RECIPES_SUCCESS:
        case constants.FETCH_RECIPE_FAILED:
        case constants.FETCH_RECIPE_SUCCESS:
        case constants.ADD_RECIPE_FAILED:
        case constants.ADD_RECIPE_SUCCESS:
        case constants.UPDATE_RECIPE_FAILED:
        case constants.UPDATE_RECIPE_SUCCESS:
        case constants.DELETE_RECIPE_FAILED:
        case constants.DELETE_RECIPE_SUCCESS:
        case constants.UPDATE_RATING_FAILED:
        case constants.UPDATE_RATING_SUCCESS:
            return false;
        default:
            return state;
    }
};


const active = (state = initialState.active, action) => {
    switch (action.type) {
        case constants.FETCH_RECIPE_SUCCESS:
            return action.payload._id;
        case constants.SET_ACTIVE_RECIPE:
            return action.payload.id;
        case constants.FETCH_RECIPE:
            return null;
        default:
            return state;
    }
};

export default combineReducers({
    byId,
    all,
    isFetching,
    active
});

export const allRecipes = ({ recipes }) => recipes.all.map(id => recipes.byId[id]);
export const isRecipesFetching = ({ recipes }) => recipes.isFetching;
export const activeRecipe = ({ recipes }) => recipes.active ? recipes.byId[recipes.active] : null;
export const recipeById = id => ({ recipes }) => recipes.byId[id];