const recipeRepository = require('./recipe.repository');

class RecipeService {
	getAllRecipes() {
		return recipeRepository.findAll();
	}

	getRecipeById(id) {
		return recipeRepository.findById(id);
	}

	addRecipe(recipe) {
		return recipeRepository.add(recipe);
	}

	updateRecipe(id, recipe) {
		return recipeRepository.update({ _id: id }, recipe);
	}

	deleteRecipe(id) {
		return recipeRepository.delete({ _id: id });
	}

	updateRating(id, recipe) {
		return recipeRepository.updateRating({ _id: id }, recipe);
	}
}

module.exports = new RecipeService();
