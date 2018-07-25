import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isRecipesFetching } from './../Recipes/RecipesReducer';
import { addRecipe } from '../Recipes/RecipesActions';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

class Recipe extends React.Component {
    handleSubmit = data => {
        this.props.actions.addRecipe(data);
    }
    goHome = () => {
        this.props.history.push("/recipes");
    }
    render() {
        const { isFetching } = this.props;
        return (
            <RecipeForm
                disabled ={isFetching}
                title="Add new recipe"
                onSubmit={this.handleSubmit}
                onHome={this.goHome}
                submitButtonTitle ="Add"
                homeButton="Home"
            />            
        )
    }
}

Recipe.propTypes = {
    isFetching: PropTypes.bool, 
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isFetching: isRecipesFetching(state)
});

const mapDispatchToProps =  dispatch => ({
    actions: bindActionCreators({ addRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);