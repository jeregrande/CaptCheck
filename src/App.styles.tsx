import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore

export const GlobalStyle = createGlobalStyle `
    html {
        height: 100%;
    }

    body {
        background-color: #444444;
        color: #555555;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }

    h3 {
        color: #DDDDDD;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #FFF;
    }

    .score {
        color: #FFF;
        font-size: 2rem;
        margin: 0;
    }

    .end-message {
        color: #333;
        font-size: 1rem;
        margin: 0;
        padding: .5em 50%;
        white-space: nowrap;
        border-radius: .2em;
        background-color: #DDD;
    }

    h1 {
        font-family: Helvetica, sans-serif;
        background-image: linear-gradient(180deg, #EEE, #EEE);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #333s);
        font-size: 70px;
        font-weight: 400;
        text-align: center;
        margin: 20px;
    }

    .start, 
    .next {
        cursor: pointer;
        background: #504aff;
        border: 2px solid #504aff;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 1em;
        padding: 0 40px;
        color: #DDDDDD;
    }

    .start {
        max-width: 200px;
    }
`
