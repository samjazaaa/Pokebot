import axios from "axios";
import * as cheerio from "cheerio";

// TODO price graph (regular checks + storage in db => graph)

/* 
      some sets do not have displays => ignore
      optional: include tin boxes if under defined max price
      include shipping costs?
*/

const BASE_URL = "https://www.cardmarket.com";
const DISPLAY_URL = BASE_URL + "/de/Pokemon/Products/Booster-Boxes";
const ID_DISPLAY = "53";

const QUERY_MAP = new Map<DisplaySize, string>([
  [18, " Display (18 Boosters)"],
  [36, " Display"],
]);

type SetInfo = {
  name: string;
  boosterPrice: number;
  displaySize: DisplaySize;
  link: string;
};

type DisplaySize = 18 | 36;

type Expansion = {
  name: string;
  cardMarketId: string;
};

type TableLink = { link: string; content: string };

async function getMinPrices(): Promise<SetInfo[]> {
  const allPrices = await getCurrentPrices();
  // TODO for each set: get minimum price of currently available boosters

  return allPrices;
}

async function getCurrentPrices(): Promise<SetInfo[]> {
  // get the last <limit> ids of sets available on cardmarket
  const limit = 20;
  const checkedExpansions = (await getAllSets()).slice(0, limit);
  console.log(checkedExpansions);

  // for each set: get prices for 18 / 36 booster display and calculate per booster price
  const prices: SetInfo[] = [];
  const searchUrl = DISPLAY_URL + "?idCategory=" + ID_DISPLAY + "&idExpansion=";
  checkedExpansions
    .filter((expansion) => {
      // TODO remove this filter after debugging
      return expansion.cardMarketId === "5223";
    })
    .forEach(async (expansion) => {
      const resp = await axios.get(searchUrl + expansion.cardMarketId);
      const $ = cheerio.load(resp.data);
      // 5 * <a href="display link">Display Name</a>
      // rows are "xx Display", "xx Display (18 Boosters)", "xx Booster Bündeln", "xx 24 Sleeved-Booster-Karton", "xx 6 Display-Karton"
      const $rowLinks = $("div.table-body > div.row div.row a");
      const links = $rowLinks
        .map((_, el) => {
          const $el = $(el);
          return { link: $el.attr("href"), content: $el.text() };
        })
        .get() as TableLink[];

      const expansionPrices: SetInfo[] = [];

      // check normal display (36)
      expansionPrices.push(await getPrice(expansion.name, 36, links));

      // TODO check half display (18)
      // expansionPrices.push(await getPrice(expansion.name, 18, links));
    });

  return prices;
}

// TODO instead of getting all and sorting by number, manually select and insert ids into db?
async function getAllSets(): Promise<Expansion[]> {
  const resp = await axios.get(DISPLAY_URL);

  const $ = cheerio.load(resp.data);
  const $expansionOptions = $("select[name='idExpansion'] > option");
  console.log("Found " + $expansionOptions.length + " individual sets!");
  const expansions: Expansion[] = $expansionOptions
    .map((_, el) => {
      const $el = $(el);
      const expansion = {
        name: $el.text(),
        cardMarketId: $el.attr("value"),
      };
      return expansion;
    })
    .get();

  return expansions
    .sort((a, b) => Number(a.cardMarketId) - Number(b.cardMarketId))
    .reverse();
}

async function getPrice(
  expansionName: string,
  size: DisplaySize,
  links: TableLink[]
): Promise<SetInfo> {
  const searchContent = QUERY_MAP.get(size)!;

  const displayPath = links.find((link) => {
    return link.content.endsWith(searchContent);
  })?.link;

  if (!displayPath) {
    console.error(
      "Unable to find Link for " + expansionName + "(" + size + ")"
    );
    return {
      name: expansionName,
      displaySize: size,
      boosterPrice: -1,
      link: "",
    };
  }
  // TODO extract price and add to array
  const displayLink = BASE_URL + displayPath;
  const resp = await axios.get(displayLink);
  console.log(resp.data);

  // TODO remove
  return {
    boosterPrice: -1,
    displaySize: size,
    link: "",
    name: expansionName,
  };
}

export default getMinPrices;
