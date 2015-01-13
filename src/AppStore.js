/**
 * App Store - manages state for the app. Probably will not need more than just this one
 * because this app is simple.
 */
"use strict";

var AppDispatcher = require("./AppDispatcher.js");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("./constants/AppConstants.js");
var assign = require("object-assign");
var SampleData = require("./sampledata/sampledata.json");

var CHANGE_EVENT = "change";

var _logs = [];

/**
 * Get logs.
 * @param {string} date - The time period to filter logs.
 */
function getLogs(date) {
    if(typeof date === "undefined" || date.trim() === ""){
        throw Error("Invalid date value");
    }

    switch (date) {
        case "today":
            return SampleData.today;
        case "yesterday":
            return SampleData.yesterday;
        case "week":
        case "month":
            return SampleData.today;
        default:
            return [];
    }
}

var AppStore = assign({}, EventEmitter.prototype, {

    getLogData: function(date) {
        return _logs;
    },

    /**
     * Get all of the logs.
     * @param {string} date - date range used to filter the logs.
     * @return {object}
     */
    getLogsForDate: function(date) {
        _logs = getLogs(date);
        this.emitChange();
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var date;

    switch (action.actionType) {
        case AppConstants.DATE_RANGE_CHANGE:
            AppStore.getLogsForDate(action.date);
            AppStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = AppStore;