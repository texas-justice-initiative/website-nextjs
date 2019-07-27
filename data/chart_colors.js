/**
 * This file contains the complete TJI color palette along with the reduced palette options to be used in charting.
 * Please refer to this when creating new components for the website.
 */
const fullPalette = {
  redHue1: '#FF8F8F' /* lighest red */,
  redHue2: '#F95858' /* lighter red */,
  redHue3: '#CE2727' /* light red */,
  redHue4: '#AA1111' /* red */,
  redHue5: '#721616' /* dark red */,
  redHue6: '#490B0B' /* darkest red */,

  blueHue1: '#83E5FF' /* lighest blue */,
  blueHue2: '#64B8DD' /* lighter blue */,
  blueHue3: '#348CB2' /* light blue */,
  blueHue4: '#0B5D93' /* blue */,
  blueHue5: '#04405B' /* dark blue */,
  blueHue6: '#052C42' /* darkest blue */,

  yellowHue1: '#FFFD00' /* lighest yellow */,
  yellowHue2: '#FFD400' /* lighter yellow */,
  yellowHue3: '#FFBC00' /* light yellow */,
  yellowHue4: '#E2A203' /* yellow */,
  yellowHue5: '#BC9800' /* dark yellow */,
  yellowHue6: '#A57F08' /* darkest yellow */,
};

// Reduced palette to be used in charts
const simplePalette = [
  fullPalette.blueHue4,
  fullPalette.redHue4,
  fullPalette.yellowHue4,
  fullPalette.blueHue2,
  fullPalette.redHue2,
  fullPalette.yellowHue2,
  fullPalette.blueHue6,
  fullPalette.redHue6,
  fullPalette.yellowHue6,
];

export default simplePalette;
