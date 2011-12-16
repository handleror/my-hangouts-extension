/**
 * Incharge of circle notifications.
 *
 * @author Mohamed Mansour 2011 (http://mohamedmansour.com)
 */
CircleNotifier = function(updater) {
  this.updater =  updater;
  this.controller = updater.controller;
  this.circles_to_notify = {};
  this.notify_circles = false;
  this.initializeListeners();
};

CircleNotifier.prototype.initializeListeners = function() {
  settings.addListener('circles_to_notify', this.onSettingsChangeListener.bind(this));
  settings.addListener('notify_circles', this.onSettingsChangeListener.bind(this));
  this.onSettingsChangeListener('circles_to_notify', settings.circles_to_notify);
  this.onSettingsChangeListener('notify_circles', settings.notify_circles);
};

CircleNotifier.prototype.notify = function(hangout) {
  for (var p in hangout.data.participants) {
    var participant = hangout.data.participants[p];
    if (participant.circle_ids) {
      for (var c in participant.circle_ids) {
        var circleID = participant.circle_ids[c];
        if (this.circles_to_notify[circleID]) {
          console.log('NOTIFY USER ', participant.name);
        }
      }
    }
  }
};

CircleNotifier.prototype.onSettingsChangeListener = function(key, val) {
  if (key == 'circles_to_notify') {
    this.circles_to_notify = {};
    if (val.length != 0) {
      for (var c in val) {
        this.circles_to_notify[val[c]] = true;
      }
    }
  }
  else if(key == 'notify_circles') {
    this.notify_circles = val;
  }
};