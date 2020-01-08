import React, { useRef, useState, useEffect }from 'react';

import trialImg from './trial_img_1.jpg';
import ResizableDiv from '../../../components/resizableDiv/resizableDiv';

import classes from './PictureContainer.module.scss';

const PictureContainer = (props) => {
    const [ isTagging, setIsTagging ] = useState();
    const [ tagAdded, setTagAdded ] = useState(false);

    const image_info = document.querySelector(`.${classes.PictureContainer}`);
    console.log(image_info);
    let image_info_width = null;
    let image_info_height = null;
    if (image_info){
        console.log(image_info.getBoundingClientRect().top);
        console.log(image_info.getBoundingClientRect().height);
        image_info_width = image_info.getBoundingClientRect().width;
        image_info_height = image_info.getBoundingClientRect().height;
    }

    
    const [ tagBoxs, setTagBoxs ] = useState([
        // {
        //     id: 'qweokrwhqt',
        //     left: '10%',
        //     top: '10%',
        //     width: '10%',
        //     height: '10%'
        // }
    ])

    const imageRef = useRef();

    useEffect(() => {
        const image_current = imageRef.current;
        setIsTagging(false);
    }, [])



    const addNewTag = (event) => {
        if (tagAdded){
            return ;
        }
        const e = event || window.event;
        console.log(`x: ${e.pageX}`, `y: ${e.pageY}`);
        const browser_width = document.documentElement.clientWidth;
        const browser_height = document.documentElement.clientHeight;

        const image_top = image_info.getBoundingClientRect().top;

        if (props.isTagging){
            const cloned_tagBoxs = [...tagBoxs];
            const new_tagBox_id = Math.floor(Math.random() * 100000);
            const new_tagBox_top = ( e.pageY - image_top - image_info_height * 0.05 ) / image_info_height * 100 + '%';
            const new_tagBox_left = ( e.pageX - browser_width * 0.05 - image_info_width * 0.05 ) / image_info_width * 100 + '%';

            console.log(new_tagBox_top);
            console.log(new_tagBox_left);

            const new_tagBox = {
                id: new_tagBox_id,
                width: '10%',
                height: '10%',
                top: new_tagBox_top,
                left: new_tagBox_left
            }

            cloned_tagBoxs.push(new_tagBox);

            setTagBoxs(cloned_tagBoxs);
        } else {
            return ;
        }

        setTagAdded(true);
    }

    const setTagPos = (box_id, pos_obj) => {
        console.log(pos_obj);
        const cloned_tagBoxs = [...tagBoxs];
        console.log(cloned_tagBoxs);

        const selected_tagBox = cloned_tagBoxs.findIndex(tagBox => {
            
            console.log(tagBox.id, box_id);
            return tagBox.id === box_id;
        });

        console.log(selected_tagBox);

        cloned_tagBoxs[selected_tagBox].width = pos_obj.width;
        cloned_tagBoxs[selected_tagBox].height = pos_obj.height;
        cloned_tagBoxs[selected_tagBox].top = pos_obj.top;
        cloned_tagBoxs[selected_tagBox].left = pos_obj.left;

        setTagBoxs(cloned_tagBoxs);
    }

    let resizableTags = null;
    
    if (tagBoxs){
        resizableTags = tagBoxs.map((resTag, index) => {
            console.log('genertate resTags');
            console.log(tagBoxs[index].width);
            const new_props = {...props};
            new_props.left = tagBoxs[index].left;
            new_props.top = tagBoxs[index].top;
            new_props.width = tagBoxs[index].width;
            new_props.height = tagBoxs[index].height;
            console.log(tagBoxs[index].height);
            console.log(image_info_height);
    
            if (image_info_height && image_info_width){
                new_props.image_height = image_info_height;
                new_props.image_width = image_info_width;
            }
            console.log(resTag.id);
    
            return (
                <ResizableDiv
                    key={'box' + index}
                    box_id={resTag.id}
                    setTagPos={setTagPos}
                    {...new_props}/>
            )
        })
    }

    return (
        <div onClick={(e) => addNewTag(e)} className={classes.PictureContainer}>
            <img  ref={imageRef} src={trialImg} className={classes.Image}/>
            {resizableTags}
        </div>
    )
}

export default PictureContainer;