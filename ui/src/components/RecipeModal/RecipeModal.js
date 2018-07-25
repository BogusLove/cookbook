import React from 'react';
import { Image, Button, Modal, Rating } from 'semantic-ui-react';
import dish from '../../pictures/dish.jpg';

export default ({ recipe, onClose }) => (
    recipe ? 
        <Modal open={!!recipe} onClose={() => onClose && onClose()}>
            <Modal.Header>
                {recipe.title}
                <Rating 
                    disabled
                    size='massive'
                    icon='star'
                    defaultRating={recipe.rating}
                    maxRating="5"
                    name="rating"
                />  
            </Modal.Header>
            <Modal.Content scrolling>
                <Image centered src={dish} size="large" />
                <Modal.Description>{recipe.description}</Modal.Description>                
            </Modal.Content>
            <Modal.Actions>               
                <Button 
                    color="green" 
                    content="close" 
                    onClick={() => onClose()}
                />
            </Modal.Actions>
        </Modal> 
    : null
);