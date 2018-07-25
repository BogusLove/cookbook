import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Form,  Button, Rating } from 'semantic-ui-react';

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.initialValues.title,
            description: props.initialValues.description,
            rating: props.initialValues.rating
        }
    }

    handleFieldChange = ({ target }) => {
        this.setState(state => ({
                ...state,
                [target.name]: target.value
            })
        );
    }    

    handleRate = (event, data) => {
        this.setState(state => ({
                ...state,
                [data.name]: data.rating
            })
        );
    }

    handleSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        const { submitButtonTitle, homeButton, onHome, title: formTitle } = this.props;
        const { title, description, rating } = this.state;

        return (
                <Segment>
                    <Button fluid
                        color="blue"
                        content={homeButton} 
                        onClick={onHome} />
                    <Form>
                        <h1>{formTitle}</h1>
                        <Form.Input
                            label="Title"
                            name="title"
                            value={title}
                            autoComplete="off"
                            placeholder="Some fancy title"
                            onChange={this.handleFieldChange}
                        />
                        <Form.TextArea
                            label="Descripsion"
                            name="description"
                            value={description}
                            placeholder="Detailed description"
                            onChange={this.handleFieldChange}
                        />
                    </Form>                  
                    <Rating 
                        size='massive'
                        icon='star' 
                        defaultRating={rating} 
                        maxRating={5} 
                        name="rating"
                        onRate={this.handleRate}
                    />  
                    <Button fluid
                        color="green" 
                        content={submitButtonTitle} 
                        onClick={this.handleSubmit} 
                    />
                </Segment>)
    }

}

RecipeForm.defaultProps = {
    initialValues: {
        title: '',
        descripsion: '',
        rating: 0
    }
};

RecipeForm.PropTypes ={
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    submitButtonIcon: PropTypes.string.isRequired,
    cancelButtonTitle: PropTypes.string.isRequired,
    cancelButtonIcon: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
        descripsion: PropTypes.string,
        rating: PropTypes.number
    })
};