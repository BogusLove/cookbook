import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeRecipe } from '../Recipes/RecipesReducer';
import { fetchRecipe, updateRecipe } from '../Recipes/RecipesActions';
import RecipeForm from '../../components/RecipeForm/RecipeForm';

class RecipeEditing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipeToFetch: props.match.params.id
        };
    }
    componentDidMount() {     
        this.props.actions.fetchRecipe(this.state.recipeToFetch);
    }
    handleSubmit = data => {
        this.props.actions.updateRecipe({
            ...this.props.recipe,
            ...data
        });
    }
    goHome = () => {
        this.props.history.push("/recipes");
    }
    render() {
        const { recipe } = this.props;
        return (
            !!recipe && <RecipeForm
                title="Update recipe"
                onSubmit={this.handleSubmit}
                onHome={this.goHome}
                initialValues={recipe}
                submitButtonTitle ="Update"
                homeButton="Home"
            />
        )       
    }
}

RecipeEditing.propTypes = {
    recipe: PropTypes.object,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recipe: activeRecipe(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ fetchRecipe, updateRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditing);