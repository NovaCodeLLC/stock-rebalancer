/**
 * Created by Thomas Lesperance on 11/12/2017.
 */

export interface MarketInfo {
  quote: {
    symbol: string,
    companyName: string,
    primaryExchange: string,
    sector: string,
    calculationPrice: string,
    open: number,
    openTime: number,
    close: number,
    closeTime: number,
    latestPrice: number,
    latestSource: string,
    latestTime: string,
    latestUpdate: number,
    latestVolume: number,
    iexRealtimePrice: any,
    iexRealtimeSize: any,
    iexLastUpdated: any,
    delayedPrice: number,
    delayedPriceTime: number,
    previousClose: number,
    change: number,
    changePercent: number,
    iexMarketPercent: any,
    iexVolume: any,
    avgTotalVolume: number,
    iexBidPrice: any,
    iexBidSize: any,
    iexAskPrice: any,
    iexAskSize: any,
    marketCap: number,
    peRatio: number,
    week52High: number,
    week52Low: number,
    ytdChange: number
  }
}
