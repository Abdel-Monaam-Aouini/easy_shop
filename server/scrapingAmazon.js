import axios from "axios";
import cheerio from "cheerio";

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

      const reviews = shelf
        .find(
          "div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small"
        )
        .children("span")
        .last()
        .attr("aria-label");

      const rating = shelf
        .find("div.a-section.a-spacing-none.a-spacing-top-micro > div > span")
        .attr("aria-label");

      const price = shelf.find("span.a-price > span.a-offscreen").text();

      products.push({
        name,
        image,
        price,
        reviews,
        rating,
      });
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export default fetchProducts;
