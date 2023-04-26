import axios from 'axios';
import { xml2json } from 'xml-js';

export async function excangeRates() {
  const arr = ['USD', 'EUR', 'CNY'];
  const xml = await (
    await axios.get('http://www.cbr.ru/scripts/XML_daily.asp')
  ).data;
  const res = [];
  const rate = JSON.parse(xml2json(xml)).elements[0].elements;
  for (let el of rate) {
    if (arr.includes(el.elements[1].elements[0].text)) {
      res.push(parseFloat(el.elements[4].elements[0].text.replace(',', '.')));
    }
  }
  res[0] += 5;
  res[1] += 5;
  res[2] += 1;
  return {
    USD: parseFloat(res[0].toFixed(2)),
    EUR: parseFloat(res[1].toFixed(2)),
    CNY: parseFloat(res[2].toFixed(2)),
  };
}
