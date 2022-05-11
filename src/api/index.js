import API from './../utils/api'
import { API_KEY } from './../utils/API_KEY';

const marketsBaseUrl = 'https://markets.horizontalsystems.xyz/api/v1'
const coingeckoBaseUrl = 'https://api.coingecko.com/api/v3/coins'

import {
  markets,
  defi,
  marketsGlobal,
  news,
  watchlist,
  coins
} from "./../store";

import { normalize, normalizeCoins, normalizeDefiCoins } from './filters';
import isEmpty from './../utils/is-empty';

export const getMarketsGlobal = async () => {
  try {
    const response = await API.get(marketsBaseUrl + "/markets/global/24h");
    marketsGlobal.set(normalize(response));
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getWatchlist = async () => {
  // @ts-ignore
  let watchlistData = await JSON.parse(localStorage.getItem("watchlist"));
  if(!isEmpty(watchlistData)){
    watchlist.set(watchlistData)
  } else {
    watchlist.set({})
  }
}

// @ts-ignore
export const getMarkets = async (count = 250) => {
  const data = markets.set(normalizeCoins(await getMarketsRecursive(1, Math.min(count, 250), count)))
  return data
}

/**
 * @param {any} ids
 */
export const getMarketsByIds = (ids) => {
  return API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&ids=${ids}`)
}

// @ts-ignore
export const getDefiCoins = async () => {
  try {
    const data = await API.get(`${marketsBaseUrl}/markets/defi?diff_period=24h,7d,30d`)
    defi.set(normalizeDefiCoins(data));
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getCoins = async () => {
  const data =  await API.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
  coins.set(data)
  return data
}

/**
 * @param {any} coin
 */
export const getCoinTvlChart = (coin, period = '7d') => {
  return API.get(`/markets/defi/${coin}/${period}`)
}

/**
 * @param {any} coin
 */
export const getCoinVolumeChart = (coin) => {
  return API.get(`${coingeckoBaseUrl}/${coin}/market_chart?vs_currency=USD&days=1`)
}

export const getDefiMarkets = () => {
  return API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&category=decentralized_finance_defi`)
}

/**
 * @param {any} id
 */
export const getCoinInfo = (id) => {
  return API.get(`${coingeckoBaseUrl}/${id}?localization=false&tickers=true&&sparkline=true`)
}

export const getNews = async () => {
  try {
    const data = await API.get(`https://min-api.cryptocompare.com/data/v2/news/?feeds=cointelegraph,theblock,decrypt&extraParams=Blocksdecoded&excludeCategories=Sponsored&api_key=${API_KEY}`)
    if (data.Message == "News list successfully returned") {
      news.set(data.Data)
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

// @ts-ignore
const getMarketsRecursive = async (page = 1, perPage = 250, count = 250) => {
  try {
    const data = await API.get(coingeckoBaseUrl + `/markets?vs_currency=USD&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y`)
    if (data.length < perPage || data.length >= count) {
      return data
    }
    return data.concat(await getMarketsRecursive(page + 1, count))

  } catch (error) {
    console.log(error);
  }
}

