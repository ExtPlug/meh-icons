

define('extplug/meh-icons/main',['require','exports','module','extplug/Plugin','plug/views/rooms/users/RoomUserRowView','jquery','meld'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var UserRowView = require('plug/views/rooms/users/RoomUserRowView');
  var $ = require('jquery');

  var _require = require('meld');

  var around = _require.around;

  var MehIcon = Plugin.extend({
    name: 'Meh Icons',
    description: 'Shows meh icons in the user list next to users who meh\'d ' + 'the current song.',

    enable: function enable() {
      this._super();
      this.advice = around(UserRowView.prototype, 'vote', this.showVote);
      this.Style({
        '#user-lists .list.room .user .icon-meh': {
          'top': '-1px',
          'right': '9px',
          'left': 'auto'
        },
        // grab icon next to a vote icon
        '#user-lists .list.room .user .icon + .icon-grab': {
          'right': '28px'
        }
      });
    },

    disable: function disable() {
      this.advice.remove();
      this._super();
    },

    // bound to the UserRowView instance
    // shows all relevant vote icons instead of just grab or woot.
    showVote: function showVote() {
      if (this.$icon) this.$icon.remove();
      this.$icon = $();
      if (this.model.get('vote') < 0) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-meh extplug-meh-icon'));
      }
      if (this.model.get('vote') > 0) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-woot'));
      }
      if (this.model.get('grab')) {
        this.$icon = this.$icon.add($('<i />').addClass('icon icon-grab'));
      }
      this.$icon.appendTo(this.$el);
    }
  });

  module.exports = MehIcon;
});
