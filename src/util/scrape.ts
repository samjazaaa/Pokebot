type SetInfo = {
  name: string;
  boosterPrice: number;
  displaySize: number;
  link: string;
};

/* 
      some sets do not have displays => ignore
      optional: include tin boxes if under defined max price
      include shipping costs?
*/

function getCurrentPrices(): SetInfo[] {
  const startYear = 2020;
  const endYear = 2023;

  // TODO get all relevant sets released in specified time

  // TODO for each set: get prices for 18 / 36 booster display and calculate per booster price

  return [];
}

function getMinPrices(): SetInfo[] {
  const allPrices = getCurrentPrices();
  // TODO for each set: get minimum price of currently available boosters

  return [];
}

// TODO price graph (regular checks + storage in db => graph)

export default getMinPrices;
