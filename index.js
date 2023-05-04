'use strict';

import { assert, log } from 'console';

const stockWrapper = document.querySelector('.stock-container')
const stockContainers = document.querySelectorAll('.stock');
const welcomeContainer = document.querySelector('.welcome-page-container')
const submitButton = document.querySelector('.submit-button');

const parseTickerCsv = async function () {
    const tickers = [];
    await fetch('./tickers.csv')
        .then(response => response.text())
        .then(text => {
            text.split("\n")
                .slice(1)
                .map(entry => {
                    tickers.push(entry.slice(0, entry.indexOf(',')));
                });
        })
    return tickers.filter(ticker => ticker !== '' && ticker !== undefined)
}

const generateMonkeyPortfolio = async function () {
    welcomeContainer.classList.add('hidden');
    stockWrapper.classList.remove('hidden')
    const allTickers = await parseTickerCsv();
    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * allTickers.length + 1);
        const ticker = allTickers[index];
        stockContainers[i].textContent = ticker;
    }
}

parseTickerCsv();

submitButton.addEventListener('click', generateMonkeyPortfolio);