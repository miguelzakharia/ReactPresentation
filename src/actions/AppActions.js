/**
 * AppActions
 */

var AppDispatcher = require("../AppDispatcher");
var AppConstants = require("../constants/AppConstants");

var AppActions = {

  /**
   * @param  {string} date - Date range value (ex. "today", "yesterday").
   */
  dateRangeChanged: function(date) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DATE_RANGE_CHANGE,
      date: date
    });
  }
};

module.exports = AppActions;