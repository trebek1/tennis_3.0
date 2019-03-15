export type TennisEntity = {|
  className: string,
  id: string,
  imageNode: ?HTMLElement,
  text: string,
  url: string,
|};

export type Court = {|
  address: string,
  clay?: string,
  courts?: number,
  grass?: string,
  index: number,
  indoor?: string,
  lights?: string,
  name: string,
  phone: string,
  proshop?: string,
  stringing?: string,
  type: string,
  wall?: string,
  x: number,
  y: number,
|};

export type CourtStyle = {
  featureType: string,
  elementType: string,
  stylers: Array<{ [string]: string | number }>,
};
