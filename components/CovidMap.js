import React from 'react';
import Tabletop from 'tabletop';
import MarkerClusterer from '@google/markerclustererplus';

const customClusterIconClasses = [
  'custom-clustericon-first',
  'custom-clustericon-second',
  'custom-clustericon-third',
  'custom-clustericon-fourth',
  'custom-clustericon-fifth',
];

const mapStyle = {
  width: '100%',
  paddingTop: '100%',
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
  width: '80%',
  height: '20px',
  float: 'left',
  textAlign: 'right',
};

const legendIconStyle = {
  minwidth: '30px',
  height: '20px',
  float: 'left',
  display: 'inline-block',
};

const legendIconFirst = {
  background: '#3167ae',
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
  background: '#4c5151',
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
  background: '#ce2827',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  display: 'block',
  float: 'left',
  marginLeft: '5px',
  marginRight: '5px',
  opacity: '80%',
};

async function fetchAPI() {
  const url = `${window.location.origin}/.netlify/functions/google_maps_params`;
  const res = await fetch(url);
  const params = await res.json();
  const API = params.client[params.env];
  // Load the Google Maps API
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
  script.async = true;
  document.body.appendChild(script);
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      clustererArray: null,
      fetchedMap: false,
      data: [],
      selectUpdate: true,
      selectedOption: 'all',
      firstLegendText: 'All Deaths',
      secondLegendText: '',
      thirdLegendText: '',
      infowindow: null,
    };
  }

  componentWillMount() {
    this.getGoogleMaps();
  }

  componentDidMount() {
    fetchAPI();
    Tabletop.init({
      key: '1mOS1wggvyRUOpI-u2VabmnQ1yJPPEgOc2zdZjWxbAwQ',
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
        zoom: 5,
        minZoom: 5,
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

      const clustererArray = [];
      for (let i = 0; i < 3; i += 1) {
        const listOfStyles = [
          {
            width: '20',
            height: '20',
            className: customClusterIconClasses[i],
          },
          {
            width: '30',
            height: '30',
            className: customClusterIconClasses[i],
          },
          {
            width: '40',
            height: '40',
            className: customClusterIconClasses[i],
          },
        ];

        const clustererStyle = {
          gridSize: 50,
          zoomOnClick: false,
          minimumClusterSize: 1,
          styles: listOfStyles,
          clusterClass: 'custom-clustericon',
        };

        const clusterer = new MarkerClusterer(map, [], clustererStyle);
        google.maps.event.addListener(clusterer, 'click', this.onClusterClick.bind(this));
        clustererArray.push(clusterer);
      }

      this.setState({
        map,
        clustererArray,
        fetchedMap: true,
      });
    });
  }

  componentDidUpdate() {
    const { fetchedMap, data, selectUpdate } = this.state;
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

  async getGoogleMaps() {
    // If we haven't already defined the promise, define it
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
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  getMapClusterer() {
    const { map, clustererArray, data, selectedOption } = this.state;
    this.setState({ selectUpdate: false });
    this.getGoogleMaps().then(google => {
      clustererArray.forEach(clusterer => clusterer.clearMarkers());

      const countyRE = new RegExp('County');
      const stateRE = new RegExp('State');
      const fedRE = new RegExp('Federal');

      const markersArray = [[], [], [], [], []];
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
          markersArray[0].push(marker);
        } else if (selectedOption === 'facility') {
          if (countyRE.test(row.FacilityType)) {
            markersArray[0].push(marker);
          } else if (stateRE.test(row.FacilityType)) {
            markersArray[1].push(marker);
          } else if (fedRE.test(row.FacilityType)) {
            markersArray[2].push(marker);
          }
        } else if (selectedOption === 'age') {
          if (parseInt(row.Age) < 45) {
            markersArray[0].push(marker);
          } else if (parseInt(row.Age) < 65) {
            markersArray[1].push(marker);
          } else {
            markersArray[2].push(marker);
          }
        }
        return markersArray;
      });

      for (let i = 0; i < 3; i += 1) {
        clustererArray[i].addMarkers(markersArray[i]);
      }

      this.setState({
        map,
        clustererArray,
        selectUpdate: false,
      });
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
      firstLegendText = 'Ages Under 45';
      secondLegendText = 'Ages 45-64';
      thirdLegendText = 'Ages 65 and over';
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
          {selectedOption === 'facility' ? (
            <div>
              <div id="second" style={legendItemStyle} className="legendItem">
                <div id="legend-second" style={legendTextStyle} className="legendText">
                  {secondLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconSecond} className="legendIcon"></span>
                </div>
              </div>
              <div id="third" style={legendItemStyle} className="legendItem">
                <div id="legend-third" style={legendTextStyle} className="legendText">
                  {thirdLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconThird} className="legendIcon"></span>
                </div>
              </div>
            </div>
          ) : null}
          {selectedOption === 'age' ? (
            <div>
              <div id="second" style={legendItemStyle} className="legendItem">
                <div id="legend-second" style={legendTextStyle} className="legendText">
                  {secondLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconSecond} className="legendIcon"></span>
                </div>
              </div>
              <div id="third" style={legendItemStyle} className="legendItem">
                <div id="legend-third" style={legendTextStyle} className="legendText">
                  {thirdLegendText}
                </div>
                <div style={legendIconStyle} className="icon">
                  <span style={legendIconThird} className="legendIcon"></span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Map;
