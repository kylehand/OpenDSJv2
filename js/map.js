/**
 *
 *
 */
function Opendisclosure() {

  // Settings
  /**
   * Total number of shapefiles in /shapes/*
   * @type {number}
   */
  this.default_type = 'primary';
  this.default_candidate = 'Nguyen';
  this.number_of_shapefiles = 0;
  this.map_options = {
    zoom: 10,
    center: new google.maps.LatLng(37.3393900, -121.8949600),
    /*
     * HYBRID
     * ROADMAP
     * SATELLITE
     * TERRAIN
     */
    mapTypeId: google.maps.MapTypeId.ROADMAP, panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT,
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    }
  };
  // end of settings

  /**
   * Internal variables (do not change)
   */
  this.map;
  this.info_window;
  this.contributions = [];
  this.polygons = [];
  this.zip_codes = [];

  this.drawMap = function(target_div) {
    this.map = new google.maps.Map(document.getElementById(target_div), this.map_options);
    this.info_window = new google.maps.InfoWindow();
  };

  /**
   * Load shape json files from /data/shapes
   */
  this.loadShapes = function() {
    // Pull shape files to work with
    $.ajaxSetup({
      async: true
    });

    // loop through pages and load shapes
    var shapes = {};
    var queries = new Array;
    for(i=0;i<=this.number_of_shapefiles;i++) {
      // Fetch zip codes
      queries.push(
        $.getJSON("../shapes/zips_" + i + ".json", function (response) {
          //console.log( "success" );
          $.each(response, function (index, item) {
            var coords = [];
            $.each(item.shape, function(i, point) {
              //console.log(point);
              coords.push(new google.maps.LatLng(point.lat, point.long));
            });
            shapes[item.zip_code] = coords;
          });
        }));
    }

    // When shapes are done loading, loop through contributions and draw shapes
    $.when.apply( this, queries ).then(function() {
      map.zip_codes = shapes;
      map.renderContributions(map.default_type, map.default_candidate);
    });
  };

  /**
   *
   */
  this.loadContributions = function() {
    $.getJSON("../contributions.json", function (response) {
      map.contributions = response;
    });
  };

  /**
   * Loop through zip code data and draw polygons
   *
   * @param type value should be primary, runoff, pac
   * @param candidate name of candidate associated with contributions
   */
  this.renderContributions = function(type, candidate) {
    type = type.toLowerCase();
    candidate = candidate.toLowerCase();
    //console.log("Render Contributions for " + candidate + " / " + type);
    // if polygons array already has data, go through and wipe it clean
    // from map
    if (this.polygons.length > 0) {
      $.each(this.polygons, function(i, row) {
        row.setMap(null);
      });
      this.polygons = [];
    }

    var polygons = this.polygons;
    if (typeof this.contributions[type] != 'undefined') {
      if (typeof this.contributions[type][candidate] != 'undefined') {
        $.each(this.contributions[type][candidate], function (i, amount) {
          if (typeof map.zip_codes[i] != 'undefined') {
            var color = '#feb24c';
            map.polygons.push(new google.maps.Polygon({
              paths: map.zip_codes[i],
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: color,
              fillOpacity: .5,
              clickable: true,
              name: "Zip Code: " + i,
              total: "Contributions: $" + amount,
              shape_color: color
            }));
          }
        });
      }
    }

    // Draw shapes on map
    $.each(this.polygons, function(i, row) {
      row.setMap(map.map);

      // add hovers/*
      google.maps.event.addListener(row, "mouseover", function(event) {
        this.setOptions({fillColor: "#00FF00"});

      });
      google.maps.event.addListener(row,"mouseout",function(){
        this.setOptions({fillColor: this.shape_color});
      });

      google.maps.event.addListener(row,"click",function(event){
        var contentString = '<div class="viewContribution"><b>'+this.name+'</b><br>' + this.total +
          //'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
          '<br></div>';
        // Replace the info window's content and position.
        map.info_window.setContent(contentString);
        map.info_window.setPosition(event.latLng);
        map.info_window.open(map.map);
      });

    });
  }
}

var map = new Opendisclosure();
$(document).ready(function () {
  map.drawMap('map');
  map.loadContributions();
  map.loadShapes();
});