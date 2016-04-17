
This is a Nodejs wrapper of `currencylayer` api for [currency-rates-store](https://www.npmjs.com/package/currency-rates-store). You need to have an account in [currencylayer.com](https://currencylayer.com)


# Example - instantiate the method directly

```
const live = require('currency-restapi-currencylayer').Live('YOUR_ACCESS_KEY');
const inspect = require('util').inspect;

live((err, rates) {
  
  if (err) return console.error(inspect(err, {colors: true}));
  console.log(inspect(rates, {colors: true}));
});
```


# Example - instantiate the api

```
const currlayer = require('currency-restapi-currencylayer')('YOUR_ACCESS_KEY');
const inspect = require('util').inspect;


// check 1 month ago rates
var d = new Date(Date.now() - 1000*60*60*24*30);  
currlayer.historical(d, (err, rates)=>{

  if (err) return console.error(inspect(err, {colors: true}));
  console.log(inspect(rates, {colors: true}));
})
```


## Options to instantiate the API
- `<String>|<Object>`
  - accessKey: `YOUR_ACCESS_KEY`
  - currencies: `<Array>|<String>`, e.g. ['USD','GBP','EUR']
  - source: the exchange rates base, default to `USD`
  
If options is a string, it means `YOUR_ACCESS_KEY`. 

More info, see [Documentation](https://currencylayer.com/documentation)

## currlayer.live(cb)

This is what [currency-rates-store](https://www.npmjs.com/package/currency-rates-store)  bot need, CurrencyRatesStore will use this api to refresh exchange rates.

callback will receive exchange rates like following

```
{
  base: 'USD|EUR|GBP'   - tell which currency this rates is based on
  rates: {
    USD: 1,             
    GBP: ...
    EUR: ...
    ...
  },
  ts: {Milliseconds}
}
```



## currlayer.historical(date, cb)

- date: `<DateString>|<Timestamp in milliseonds>|<Date object>`


## currlayer.list(cb)
