import React from 'react';
import Tabletop from 'tabletop';
import MarkerClusterer from '@google/markerclustererplus';

const mapStyle = {
  width: '100%',
  paddingTop: '67%',
};

const clusterStyleFirstSmall = {
  width: '20',
  height: '20',
  background: '#0B5D93',
  className: 'custom-clustericon-first',
};

const clusterStyleFirstMed = {
  width: '30',
  height: '30',
  background: '#0B5D93',
  className: 'custom-clustericon-first',
};

const clusterStyleFirstLarge = {
  width: '40',
  height: '40',
  background: '#0B5D93',
  className: 'custom-clustericon-first',
};

const clusterStyleSecondSmall = {
  width: '20',
  height: '20',
  background: '#CE2727',
  className: 'custom-clustericon-second',
};

const clusterStyleSecondMed = {
  width: '30',
  height: '30',
  background: '#CE2727',
  className: 'custom-clustericon-second',
};

const clusterStyleSecondLarge = {
  width: '40',
  height: '40',
  background: '#CE2727',
  className: 'custom-clustericon-second',
};

const clusterStyleThirdSmall = {
  width: '20',
  height: '20',
  background: '#634562',
  className: 'custom-clustericon-third',
};

const clusterStyleThirdMed = {
  width: '30',
  height: '30',
  background: '#634562',
  className: 'custom-clustericon-third',
};

const clusterStyleThirdLarge = {
  width: '40',
  height: '40',
  background: '#634562',
  className: 'custom-clustericon-third',
};

const formStyle = {
  width: '50%',
  float: 'left',
};

const legendStyle = {
  width: '50%',
  float: 'right',
};

const legendItemStyle = {
  width: '100%',
  marginBottom: '5px',
};

const legendTextStyle = {
  width: '90%',
  height: '20px',
  float: 'left',
  textAlign: 'right',
};

const legendIconStyle = {
  minWidth: '30px',
  height: '20px',
  float: 'right',
  display: 'inline-block',
};

const legendIconFirst = {
  background: '#0B5D93',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  display: 'block',
  float: 'right',
  marginLeft: '5px',
  marginRight: '5px',
  opacity: '80%',
};

const legendIconSecond = {
  background: '#CE2727',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  display: 'block',
  float: 'left',
  marginLeft: '5px',
  marginRight: '5px',
  opacity: '80%',
};

const legendIconThird = {
  background: '#634562',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  display: 'block',
  float: 'left',
  marginLeft: '5px',
  marginRight: '5px',
  opacity: '80%',
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      firstClusterer: null,
      secondClusterer: null,
      thirdClusterer: null,
      fetchedMap: false,
      data: [],
      selectUpdate: true,
      selectedOption: 'all',
      firstLegendText: 'All Deaths',
      secondLegendText: '',
      thirdLegendText: '',
      isLoaded: false,
      params: null,
      infowindow: null,
    };
  }

  componentWillMount() {
    this.getGoogleMaps();
  }

  componentDidMount() {
    this.fetchAPI();
    Tabletop.init({
      key: '1-Efe9kHJNuxvoO4pz23ioAE3D_dbugnedqnahVuBMkk',
      callback: googleData => {
        this.setState({ data: googleData });
      },
      simpleSheet: true,
    });

    this.getGoogleMaps().then(google => {
      const location = { lat: 31.968599, lng: -99.90181 };

      const styledMapType = new google.maps.StyledMapType(
        [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f5f5',
              },
            ],
          },
          {
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161',
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#f5f5f5',
              },
            ],
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry',
            stylers: [
              {
                color: '#bdbdbd',
              },
            ],
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#bdbdbd',
              },
              {
                visibility: 'on',
              },
              {
                weight: 2,
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#bdbdbd',
              },
            ],
          },
          {
            featureType: 'administrative.locality',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry',
            stylers: [
              {
                color: '#bdbdbd',
              },
              {
                weight: 2,
              },
            ],
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#bdbdbd',
              },
              {
                visibility: 'on',
              },
              {
                weight: 1.5,
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#eeeeee',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e5e5e5',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#ffffff',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#ffffff',
              },
              {
                visibility: 'simplified',
              },
              {
                weight: 0.5,
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e',
              },
            ],
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e5e5e5',
              },
            ],
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#eeeeee',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#c9c9c9',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e',
              },
            ],
          },
        ],
        { name: 'TJI Map' }
      );

      const mapOptions = {
        zoom: 6,
        minZoom: 6,
        center: location,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ['tji_map'],
        },
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      map.mapTypes.set('tji_map', styledMapType);
      map.setMapTypeId('tji_map');

      const firstStyle = {
        gridSize: 80,
        zoomOnClick: false,
        minimumClusterSize: 1,
        background: '#0B5D93',
        styles: [clusterStyleFirstSmall, clusterStyleFirstMed, clusterStyleFirstLarge],
        clusterClass: 'custom-clustericon',
      };

      const secondStyle = {
        gridSize: 80,
        zoomOnClick: false,
        minimumClusterSize: 1,
        background: '#CE2727',
        styles: [clusterStyleSecondSmall, clusterStyleSecondMed, clusterStyleSecondLarge],
        clusterClass: 'custom-clustericon',
      };

      const thirdStyle = {
        gridSize: 80,
        zoomOnClick: false,
        minimumClusterSize: 1,
        background: '#634562',
        styles: [clusterStyleThirdSmall, clusterStyleThirdMed, clusterStyleThirdLarge],
        clusterClass: 'custom-clustericon',
      };

      const firstClusterer = new MarkerClusterer(map, [], firstStyle);
      google.maps.event.addListener(firstClusterer, 'click', this.onClusterClick.bind(this));
      const secondClusterer = new MarkerClusterer(map, [], secondStyle);
      google.maps.event.addListener(secondClusterer, 'click', this.onClusterClick.bind(this));
      const thirdClusterer = new MarkerClusterer(map, [], thirdStyle);
      google.maps.event.addListener(thirdClusterer, 'click', this.onClusterClick.bind(this));

      this.setState({
        map,
        firstClusterer,
        secondClusterer,
        thirdClusterer,
        fetchedMap: true,
      });
    });
  }

  componentDidUpdate() {
    const { fetchedMap, data, selectUpdate, isLoaded, params } = this.state;
    if (isLoaded) {
      console.log('Loaded', params);
    }
    if (fetchedMap && data.length && selectUpdate) {
      this.getMapClusterer();
    }
  }

  onClusterClick(cluster) {
    let { infowindow } = this.state;
    if (infowindow) {
      infowindow.close();
    }
    this.getGoogleMaps().then(google => {
      const markers = cluster.getMarkers();
      const facilities = {};
      let contentBodyString = '';
      markers.forEach(marker => {
        if (!(marker.info.facility in facilities)) {
          facilities[marker.info.facility] = marker.info;
        }
        contentBodyString = `${contentBodyString}<b>${marker.info.name}</b>, died on ${marker.info.dod} at the age of ${marker.info.age}.</br>`;
      });
      let contentHeaderString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' +
        'Facilities:' +
        '</h2>';
      Object.entries(facilities).forEach(facility => {
        const info = facility[1];
        contentHeaderString = `${contentHeaderString}<b>${info.facility}</b>, ${info.facilityType}, ${info.city}, ${info.county} County, TX</br>`;
      });
      const contentString =
        `${contentHeaderString}<div id="bodyContent"><p>` +
        `<h2 id="bodyHeading" class="bodyHeading">` +
        `Deaths:` +
        `</h2>${contentBodyString}</p></div></div>`;
      infowindow = new google.maps.InfoWindow({
        position: cluster.getCenter(),
        content: contentString,
      });
      infowindow.open(cluster.getMap());
      this.setState({ infowindow });
    });
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    const { isLoaded, params } = this.state;
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          const { google } = window;
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        if (isLoaded) {
          console.log('Got API', params);
        }
        const API = 'AIzaSyDAh7M89BnID8kGVXBrNtxJfD-jjDDFRCg';
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  getMapClusterer() {
    const { map, firstClusterer, secondClusterer, thirdClusterer, data, selectedOption } = this.state;
    this.getGoogleMaps().then(google => {
      firstClusterer.clearMarkers();
      secondClusterer.clearMarkers();
      thirdClusterer.clearMarkers();

      const countyRE = new RegExp('County');
      const stateRE = new RegExp('State');
      const fedRE = new RegExp('Federal');
      const firstMarkers = [];
      const secondMarkers = [];
      const thirdMarkers = [];

      data.map(function(row) {
        const geometry = row.Geolocation.split(',');
        const location = { lat: parseFloat(geometry[0]), lng: parseFloat(geometry[1]) };
        const marker = new google.maps.Marker({
          position: location,
          info: {
            name: row.Name,
            dod: row.DateofDeath,
            age: row.Age,
            facility: row.Facility,
            facilityType: row.FacilityType,
            city: row.City,
            county: row.County,
          },
        });

        if (selectedOption === 'all') {
          firstMarkers.push(marker);
        } else if (selectedOption === 'facility') {
          if (countyRE.test(row.FacilityType)) {
            firstMarkers.push(marker);
          } else if (stateRE.test(row.FacilityType)) {
            secondMarkers.push(marker);
          } else if (fedRE.test(row.FacilityType)) {
            thirdMarkers.push(marker);
          }
        } else if (selectedOption === 'age') {
          if (parseInt(row.Age) < 25) {
            firstMarkers.push(marker);
          } else if (parseInt(row.Age) < 55) {
            secondMarkers.push(marker);
          } else {
            thirdMarkers.push(marker);
          }
        }
      });

      firstClusterer.addMarkers(firstMarkers, false);
      secondClusterer.addMarkers(secondMarkers, false);
      thirdClusterer.addMarkers(thirdMarkers, false);
      this.setState({
        map,
        firstClusterer,
        secondClusterer,
        thirdClusterer,
        selectUpdate: false,
      });
    });
  }

  async fetchAPI() {
    console.log('fetchAPI');
    const url = `${window.location.origin}/.netlify/functions/google_maps_params`;
    const res = await fetch(url);
    const params = await res.json();
    this.setState({
      isLoaded: true,
      params,
    });
  }

  handleOptionChange(event) {
    const { infowindow } = this.state;
    let firstLegendText = '';
    let secondLegendText = '';
    let thirdLegendText = '';
    if (infowindow) {
      infowindow.close();
    }
    const selectedOption = event.target.value;
    if (selectedOption === 'all') {
      firstLegendText = 'All Deaths';
    } else if (selectedOption === 'facility') {
      firstLegendText = 'County Facilities';
      secondLegendText = 'State Facility';
      thirdLegendText = 'Federal Facility';
    } else if (selectedOption === 'age') {
      firstLegendText = 'Ages Under 25';
      secondLegendText = 'Ages 25-55';
      thirdLegendText = 'Ages over 55';
    }
    this.setState({
      selectedOption,
      selectUpdate: true,
      firstLegendText,
      secondLegendText,
      thirdLegendText,
    });
  }

  render() {
    const { selectedOption, firstLegendText, secondLegendText, thirdLegendText } = this.state;
    return (
      <div id="map-container">
        <div id="map" style={mapStyle} className="map"></div>
        <div id="form" style={formStyle} className="form">
          <form>
            <div className="form-check">
              <label htmlFor="all-deaths-label">
                <input
                  id="all-deaths-label"
                  type="radio"
                  name="all"
                  value="all"
                  checked={selectedOption === 'all'}
                  onChange={this.handleOptionChange.bind(this)}
                  className="form-check-input"
                />
                All Deaths
              </label>
            </div>
            <div onChange={this.handleOptionChange.bind(this)} className="form-check">
              <label htmlFor="facility-label">
                <input
                  id="facility-label"
                  type="radio"
                  name="facility"
                  value="facility"
                  checked={selectedOption === 'facility'}
                  onChange={this.handleOptionChange.bind(this)}
                  className="form-check-input"
                />
                By Facility
              </label>
            </div>
            <div onChange={this.handleOptionChange.bind(this)} className="form-check">
              <label htmlFor="age-label">
                <input
                  id="age-label"
                  type="radio"
                  name="age"
                  value="age"
                  checked={selectedOption === 'age'}
                  onChange={this.handleOptionChange.bind(this)}
                  className="form-check-input"
                />
                By Age
              </label>
            </div>
          </form>
        </div>
        <div id="legend" style={legendStyle} className="legend">
          <div id="first" style={legendItemStyle} className="legendItem">
            <div id="legend-first" style={legendTextStyle} className="legendText">
              {firstLegendText}
            </div>
            <div style={legendIconStyle} className="icon">
              <span style={legendIconFirst} className="legendIcon"></span>
            </div>
          </div>
          {selectedOption === 'all' ? null : (
            <div>
              <div id="second" style={legendItemStyle} className="legendItem">
                <div id="legend-second" style={legendTextStyle} className="legendText">
                  {secondLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconThird} className="legendIcon"></span>
                </div>
              </div>
              <div id="third" style={legendItemStyle} className="legendItem">
                <div id="legend-third" style={legendTextStyle} className="legendText">
                  {thirdLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconSecond} className="legendIcon"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Map;
