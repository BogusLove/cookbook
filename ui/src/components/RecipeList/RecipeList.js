import React from 'react';
import { Image, Button, Card, Rating } from 'semantic-ui-react';
import dish from '../../pictures/dish.jpg';

export default ({ recipes, onEdit, onDelete, onView, onRate }) => (    
    recipes.map((recipe, index) => (
        <Card fluid key={index}>
            <Card.Content>  
                <Image 
                    size="small" 
                    src={dish} 
                />
                <Card.Header>Title: {recipe.title}</Card.Header>
                <Card.Description>Description: {recipe.description}</Card.Description> 
                <Button 
                    className="right floated"
                    color="red" 
                    content="Delete"
                    onClick={() => onDelete(recipe._id)} 
                />
                <Button 
                    className="right floated"
                    color="orange" 
                    content="Edit"
                    onClick={() => onEdit(recipe._id)} 
                /> 
                <Button       
                    className="right floated"
                    color="yellow" 
                    content="View"
                    onClick={() => onView(recipe._id)} 
                />                
                <Rating 
                    className="left floated"
                    size='massive'
                    icon='star' 
                    defaultRating={recipe.rating}
                    maxRating="5"
                    name="rating"
                    onRate={(event, data) => onRate(event, data, recipe._id)}
                />  
            </Card.Content>
        </Card>
    ) 
))