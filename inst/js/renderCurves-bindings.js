// URL input binding
// This input binding is very similar to textInputBinding from
// shiny.js.
var renderAmpCurvesBinding = new Shiny.InputBinding();

// An input binding must implement these methods
$.extend(renderAmpCurvesBinding, {

  // This returns a jQuery object with the DOM element
  find: function(scope) {
    return $(scope).find('.pcr-curves');
  },

  // return the ID of the DOM element
  getId: function(el) {
    return el.id;
  },

  // Given the DOM element for the input, return the value
  getValue: function(el) {
    return true;
  },

  markCurves: function(el, toMarkCurves, markType) {
    if (Array.isArray(toMarkCurves) === false)
      toMarkCurves = [toMarkCurves];

    var graphDiv = el.getElementsByClassName('plotly')[0];
    graphDiv.data.forEach(function(curve) {
      if (toMarkCurves.some(function(toMarkCurve) {
        return curve.customdata[0] === toMarkCurve;
              }))
              {
                if (markType === "highlight") {
          curve.line.width = 4;
                } else {
                  curve.visible = false;
                }
        } else {
          if (markType === "highlight") {
          curve.line.width = 2;
                } else {
                  curve.visible = true;
                }
        }
    });
    Plotly.redraw(graphDiv);
  },

  // Set up the event listeners so that interactions with the
  // input will result in data being sent to server.
  // callback is a function that queues data to be sent to
  // the server.
  subscribe: function(el, callback) {
    $(el).on('change.renderAmpCurvesBinding', function(event) {
      callback(true);
    });
  },

  // Remove the event listeners
  unsubscribe: function(el) {
    $(el).off('.renderAmpCurvesBinding');
  },

  // Receive messages from the server.
  // Messages sent by updateCurves() are received by this function.
  receiveMessage: function(el, data) {
    if (data.hasOwnProperty('hideCurves')){
      this.markCurves(el, data.hideCurves, "hide")
    };

    if (data.hasOwnProperty('highlightCurves')){
      this.markCurves(el, data.highlightCurves, "highlight")
    };

    if (data.hasOwnProperty('label'))
      $(el).parent().find('label[for="' + $escape(el.id) + '"]').text(data.label);

    $(el).trigger('change');
  },

  // This returns a full description of the input's state.
  // Note that some inputs may be too complex for a full description of the
  // state to be feasible.
  getState: function(el) {
    return {
    label: $(el).parent().find('label[for="' + $escape(el.id) + '"]').text(),
    value: el.value
    };
  },

  // The input rate limiting policy
  getRatePolicy: function() {
    return {
      // Can be 'debounce' or 'throttle'
      policy: 'debounce',
      delay: 250
    };
  }


});

Shiny.inputBindings.register(renderAmpCurvesBinding, 'Kablag.renderAmpCurvesBinding');