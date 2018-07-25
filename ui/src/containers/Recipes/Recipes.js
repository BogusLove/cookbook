import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Button, Input } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe, updateRating } from './RecipesActions';
import { allRecipes } from './RecipesReducer';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRecipe: null,            
            recipesToSHow: [],
            searchInput: '',
            sortClick: false
        };
    }
    componentDidMount() {
        this.props.actions.fetchAllRecipes();        
    }
    handleDelete = id => {
        this.props.actions.deleteRecipe(id);
    }
    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }
    handleView = id => {
        this.props.history.push(`/recipes/${id}/view`);
    }
    handleRate = (event, data, id) => {
        let activeRecipe = this.props.allRecipes.find(recipe => recipe._id === id);
        activeRecipe.rating = data.rating;
        this.props.actions.updateRating({
            ...activeRecipe
        });
    }
    handleRecipeCreate = () => {
        this.props.history.push(`/recipes/new`);
    }
    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find(recipe => recipe._id === id)
        })
    }
    handleModalClose = () => {
        this.toggleRecipeModal(null);
    }
    filter = (value) => {
        return this.props.allRecipes.filter(recipe => {
            return recipe.title.includes(value);
        })
    }
    sort = (value) => {
        return [...this.props.allRecipes].sort((a, b) => {
            return value * (b.rating - a.rating);
        })
    }
    search = (event, data) => {    
        const value = data.value.toLowerCase();
        this.setState({
            searchInput: value,
            recipesToSHow: this.filter(value)
        });
    }    
    sortByRating = (direction) => {            
        this.setState({
            sortClick: true,
            recipesToSHow: this.sort(direction)            
        });
    }
    buffer = (recipes) => {
        return (
            <RecipeList 
                recipes={recipes} 
                //onView={this.toggleRecipeModal} 
                onView={this.handleView} 
                onDelete={this.handleDelete} 
                onEdit={this.handleEdit}
                onRate={this.handleRate}
            />
        );                
    }
    render() {       
        const { allRecipes } = this.props;
        const { activeRecipe, searchInput, recipesToSHow, sortClick } = this.state;
        return (
            <Container>
                <Container textAlign="center">
                    <Input fluid 
                        aligned="right"
                        placeholder="search"
                        onChange={this.search}
                        size="big"
                    />
                    <br />
                    <Button fluid
                        size="big"
                        content="Add new recipe"
                        color="green"
                        onClick={this.handleRecipeCreate}
                    />
                    <br />
                    <Button 
                        size="medium"
                        content="Rating up"
                        floated="right"
                        color="grey"
                        onClick={() => this.sortByRating(-1)}
                    />
                    <Button 
                        size="medium"
                        content="Rating down"
                        floated="right"
                        color="grey"
                        onClick={() => this.sortByRating(1)}
                    />
                    <br /><br />
                    {searchInput || sortClick ? this.buffer(recipesToSHow) : this.buffer(allRecipes)}  
                </Container>
                <RecipeModal 
                    recipe={activeRecipe} 
                    onClose={this.handleModalClose}
                />
            </Container>
        )
    }
}

Recipes.propTypes = {
    allRecipes: PropTypes.array,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    allRecipes: allRecipes(state)
});

const mapDispatchToProps =  dispatch => ({
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe, updateRating }, dispatch)
});

export default connect(mapStateToProps,  mapDispatchToProps)(Recipes);