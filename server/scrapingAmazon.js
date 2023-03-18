import axios from "axios";
import * as cheerio from "cheerio";

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309"
    );

    const html = response.data;

    const $ = cheerio.load(html);

    const products = [];

    $(
      "div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20"
    ).each((_idx, el) => {
      const shelf = $(el);
      const name = shelf
        .find("span.a-size-base-plus.a-color-base.a-text-normal")
        .text();

      const image = shelf.find(".s-image").attr("src");

      const price = shelf.find("span.a-price > span.a-offscreen")
                        .text()
                        .slice(1, 6) || 10;

      products.push({
        name,
        image,
        price,
      });
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export default fetchProducts;
