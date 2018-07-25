import { takeLatest, all, call, put, fork } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';
import { arrayOfRecipes } from './RecipesScheme';
import * as constants from './RecipesConstants';
import recipeAPI from './../../api';


function* fetchAllRecipes() {
    try {
        const recipes = yield call(recipeAPI.fetchAllRecipes);
        const normalizeData = normalize(recipes.data, arrayOfRecipes);
        yield put({
            type: constants.FETCH_ALL_RECIPES_SUCCESS,
            payload: {
                all: normalizeData.result,
                byId: normalizeData.entities.byId || {}
            }
        });
    } catch (error) {
        yield put({
            type: constants.FETCH_ALL_RECIPES_FAILED
        });

    }
}

function* addRecipe(action) {
    try {
        const recipeResponse = yield call(recipeAPI.addRecipe, action.payload);
        yield put({
            type: constants.ADD_RECIPE_SUCCESS,
            payload: {
                ...recipeResponse.data
            }
        });
        yield put(push(`/recipes`));
    } catch (error) {
        yield put({
            type: constants.ADD_RECIPE_FAILED
        });
    }
}

function* updateRecipe(action) {
    try {
        yield call(recipeAPI.updateRecipe, action.payload);
        yield put({
            type: constants.UPDATE_RECIPE_SUCCESS,
            payload: action.payload
        });
        yield put(push(`/recipes`));
    } catch (error) {
        yield put({
            type: constants.UPDATE_RECIPE_FAILED
        });
    }
}

function* deleteRecipe(action) {
    try {
        yield call(recipeAPI.deleteRecipe, action.payload.id);
        yield put({
            type: constants.DELETE_RECIPE_SUCCESS,
            payload: {id: action.payload.id}
        });
    } catch (error) {
        yield put({
            type: constants.DELETE_RECIPE_FAILED
        });
    }
}


function* fetchRecipe(action) {
    try {
        const request = yield call(recipeAPI.fetchRecipe, action.payload.id);
        yield put({
            type: constants.FETCH_RECIPE_SUCCESS,
            payload: {
                ...request.data
            }
        });
    } catch (error) {
        yield put({
            type: constants.FETCH_RECIPE_FAILED
        });
    }
}

function* updateRating(action) {
    try {
        yield call(recipeAPI.updateRating, action.payload);
        yield put({
            type: constants.UPDATE_RATING_SUCCESS,
            payload: action.payload
        });
    } catch (error) {
        yield put({
            type: constants.UPDATE_RATING_FAILED
        });
    }
}

function* recipesSaga() {
    yield all([
        takeLatest(constants.FETCH_ALL_RECIPES, fetchAllRecipes),
        takeLatest(constants.DELETE_RECIPE, deleteRecipe),
        takeLatest(constants.ADD_RECIPE, addRecipe),
        takeLatest(constants.UPDATE_RECIPE, updateRecipe),
        takeLatest(constants.FETCH_RECIPE, fetchRecipe),
        takeLatest(constants.UPDATE_RATING, updateRating)
    ])
}

export default function* rootSaga() {
    yield all([
        fork(recipesSaga)
    ])
}