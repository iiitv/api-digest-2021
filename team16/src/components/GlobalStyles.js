import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    html{
        &::-webkit-scrollbar{
            width: 0.5rem;
        }
        &::-webkit-scrollbar-thumb{
            background-color: darkgrey;
        }
        &::-webkit-scrollbar-track {
            background: white;
        }
    }
    body{
        font-family: 'Montserrat', sans-serif;
        width: 100%;
    }
    h2{
        font-size: 3rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: bolder;
        color: #00003f;
    }
    h3{
        font-size: 1.3rem;
        color: #00003f;
        padding: 1.5rem 0rem;
    }
    p{
        font-size: 1.2rem;
        line-height: 200%;
        color: #00003f;
    }
    a{
        text-decoration: none;
        color: #00003f;
    }
    img{
        display: block;
    }
    h4{
        display: flex;
        justify-content: center;
        padding: 3rem;
        cursor: pointer;
        font-size: 1.5rem;
    }
    input{
        font-weight: bold;
        font-family: "Montserrat", sans-serif;
    }
`;

export default GlobalStyles;