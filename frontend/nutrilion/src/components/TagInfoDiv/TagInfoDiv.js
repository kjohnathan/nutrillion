import React from 'react';

import classes from './TagInfoDiv.module.scss';

const taginfodiv = (props) => {
    console.log(props);
    if (props.editing){
        return (
            <div 
                className={classes.EditingDiv}
                onClick={(e) => props.tagEditingHandler(e, props.tag_id)}
                name='clickable'>
                <input 
                    className={classes.EditingInput}
                    id='input'
                    placeholder={props.name}
                    onChange={(e) => props.editTagNameHandler(e, props.tag_id)}/>
                <p 
                    id='deleteIcon'
                    className={classes.DeleteIcon}
                    onClick={() => console.log('11111')}>X</p>
            </div>
        )
    }

    return (
        <div 
            className={classes.TagInfoDiv}
            onClick={(e) => props.tagEditingHandler(e, props.tag_id)}
            name='clickable'>
            <p name='clickable'>{props.name}</p>
        </div>
    )
}

export default taginfodiv;