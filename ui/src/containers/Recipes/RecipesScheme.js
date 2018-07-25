import { schema } from 'normalizr';

export const recipes = new schema.Entity(
    'byId', {}, { idAttribute: '_id' }
);

export const arrayOfRecipes = new schema.Array(recipes);