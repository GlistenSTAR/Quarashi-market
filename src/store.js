import { writable } from 'svelte/store';

export const coinInfo = writable({});
export const markets = writable({});
export const defi = writable({});
export const marketsGlobal = writable({});
export const news = writable({});

export const watchlist = writable({});

export const categoriesData  = writable({});
export const advancedData  = writable({});
export const watchlistData  = writable({});

export const flag = writable("")