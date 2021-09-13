import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FaQuoteLeft, FaTwitterSquare, FaTumblrSquare } from 'react-icons/fa';

const Quotes = () => {

    const base_url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
    const [quotesData, setQuotesData] = useState([])
    const [quoteToShow, setQuoteToShow] = useState('')
    const [colorToShow, setColorToShow] = useState('')

    let random = ''
    let randomColor = ''


    useEffect(() => {
        fetchQuotes()
        selectColors()
    }, [])


    const fetchQuotes = () => {
        axios.get(base_url)
            .then(response => {
                const data = response.data.quotes
                random = Math.floor(Math.random() * data.length)
                setQuotesData(data)
                setQuoteToShow(data[random])
            }).catch(error => {
                console.log(error.message)
            })
    }

    const selectColors = () => {
        randomColor = Math.floor(Math.random() * colors.length)

        setColorToShow(colors[randomColor])
    }

    const handleClick = () => {
        fetchQuotes()
        selectColors()
    }


    const Contenedor = styled.div`
        background:${colorToShow};
        width:100%;
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    `;

    const Quote = styled.div`
        background:#FFFFFA;
        width:60%;
        padding:50px;
        color:${colorToShow}
    `;

    const ContainerButtons = styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
    `;

    const QuoteBody = styled.div`
        padding:40px;
        text-align:justify;
    `;

    const SpanQuote = styled.span`
        margin-top:20px;
        display:block;
        text-align:right;
    `;

    const ContRedes = styled.div`
        font-size:40px;
    `;


    const InpNewQuote = styled.input`
        background:${colorToShow};
        border:none;
        padding:15px;
        color:#FFFFFA;
        border-radius:10px;
    `;

    const EnlacesRedes = styled.a`
        color:${colorToShow};
    `;

    return (
        <Contenedor id="quote-box">
            <Quote>
                <QuoteBody >
                    <h1 id="text"><FaQuoteLeft /> {quoteToShow.quote}</h1>
                    <SpanQuote id="author">-{quoteToShow.author}</SpanQuote>
                </QuoteBody>


                <ContainerButtons>
                    <ContRedes className="redes">
                        <EnlacesRedes href="twitter.com/intent/tweet" target="_blank" id="tweet-quote">
                            <FaTwitterSquare />
                        </EnlacesRedes>
                        <EnlacesRedes href="">
                            <FaTumblrSquare />
                        </EnlacesRedes>
                    </ContRedes>

                    <InpNewQuote id="new-quote" type="button" value="New Quote" onClick={handleClick} />
                </ContainerButtons>
            </Quote>


        </Contenedor>
    )
}

export default Quotes
