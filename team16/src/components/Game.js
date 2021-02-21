import React from "react";
// Styling and Animation
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {loadDetail} from '../actions/detailAction';
import {smallImage} from '../util';

const Game = ({name, released, image, id}) => {
    const stringPathId = id.toString();
    //Load Detail handlers
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        document.body.style.overflow = 'hidden';
        dispatch(loadDetail(id));
    };

    return(
        <StyledGame layoutId={stringPathId} onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <motion.h3 LayoutId = {`title ${stringPathId}`}>{name}</motion.h3>
                <p>{released}</p>
                <motion.img 
                    LayoutId = {`image ${stringPathId}`}
                    src={smallImage(image,640)} 
                    alt={name} 
                />
            </Link>
        </StyledGame>
    );
};

const StyledGame = styled(motion.div)`
    min-height: 30vh;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    img{
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`;

export default Game;