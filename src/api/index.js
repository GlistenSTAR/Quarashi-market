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
  coins,
  coinInfo,
  defiDominance
} from "./../store";
import coinsStore from '$lib/coins-store'

import { normalize, normalizeCoins, normalizeDefiCoins, normalizeCoinInfo } from './filters';
import isEmpty from './../utils/is-empty';

export const getMarketsGlobal = async (flag) => {
  try {
    let response;
    if (flag && typeof localStorage !== "undefined") {
      response = await API.get(marketsBaseUrl + "/markets/global/24h");
      localStorage.setItem('marketGlobal', JSON.stringify(response))
    } else {
      if (typeof localStorage !== "undefined") {
        response = JSON.parse(localStorage.getItem("marketGlobal"))
      }
    }
    marketsGlobal.set(normalize(response));
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getWatchlist = async () => {
  // @ts-ignore
  let watchlistData = await JSON.parse(localStorage.getItem("watchlist"));
  if (!isEmpty(watchlistData)) {
    watchlist.set(watchlistData)
  } else {
    watchlist.set({})
  }
}

// @ts-ignore
export const getMarkets = async (flag, count = 250) => {
  try {
    let data;
    if (flag && typeof localStorage !== "undefined") {
      data = normalizeCoins(await getMarketsRecursive(1, Math.min(count, 250), count));
      localStorage.setItem('markets', JSON.stringify(data))
    } else {
      if (typeof localStorage !== "undefined") {
        data = JSON.parse(localStorage.getItem("markets"))
      }
    }
    markets.set(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

// @ts-ignore
export const getDefiCoins = async (flag) => {
  try {
    let data;
    if (flag && typeof localStorage !== "undefined") {
      data = await API.get(`${marketsBaseUrl}/markets/defi?diff_period=24h,7d,30d`)
      localStorage.setItem('defi', JSON.stringify(data))
    } else {
      if (typeof localStorage !== "undefined") {
        data = JSON.parse(localStorage.getItem("defi"))
      }
    }
    defi.set(normalizeDefiCoins(data));
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getCoins = async (flag) => {
  try {
    let data;
    if (flag && typeof localStorage !== "undefined") {
      data = await API.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
      localStorage.setItem('coins', JSON.stringify(data))
    } else {
      if (typeof localStorage !== "undefined") {
        data = JSON.parse(localStorage.getItem("coins"))
      }
    }
    coins.set(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

/**
 * @param {any} coin
 */

// use modal
export const getCoinTvlChart = (coin, period = '7d') => {
  return API.get(`/markets/defi/${coin}/${period}`)
}

/**
 * @param {any} coin
 */
// use modal
export const getCoinVolumeChart = (coin) => {
  return API.get(`${coingeckoBaseUrl}/${coin}/market_chart?vs_currency=USD&days=1`)
}

export const getDefiMarkets = async (flag) => {
  try {
    let data;
    if (flag && typeof localStorage !== "undefined") {
      data = await API.get(`${coingeckoBaseUrl}/markets?vs_currency=USD&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d,14d,30d,200d,1y&category=decentralized_finance_defi`)
      localStorage.setItem('defiDominance', JSON.stringify(data))
    } else {
      if (typeof localStorage !== "undefined") {
        data = JSON.parse(localStorage.getItem("defiDominance"))
      }
    }
    defiDominance.set(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

/**
 * @param {any} id
 */
export const getCoinInfo = async (id) => {
  try {
    const data = await API.get(`${coingeckoBaseUrl}/${id}?localization=false&tickers=true&&sparkline=true`)
    coinInfo.set(normalizeCoinInfo(data, coinsStore.coins[id]))
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getNews = async (flag) => {
  try {
    let data;
    if (flag && typeof localStorage !== "undefined") {
      data = await API.get(`https://min-api.cryptocompare.com/data/v2/news/?feeds=cointelegraph,theblock,decrypt&extraParams=Blocksdecoded&excludeCategories=Sponsored&api_key=${API_KEY}`)
      localStorage.setItem('news', JSON.stringify(data))
    } else {
      if (typeof localStorage !== "undefined") {
        data = JSON.parse(localStorage.getItem("news"))
      }
    }

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

