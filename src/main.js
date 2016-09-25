import Plugin from 'extplug/Plugin';
import UserRowView from 'plug/views/rooms/users/RoomUserRowView';
import $ from 'jquery';
import { around } from 'meld';
import style from './style.css';

const MehIcon = Plugin.extend({
  name: 'Meh Icons',
  description: 'Shows meh icons in the user list next to users who meh\'d ' +
               'the current song.',

  style,

  enable() {
    this.advice = around(UserRowView.prototype, 'vote', this.showVote);
  },

  disable() {
    this.advice.remove();
  },

  // bound to the UserRowView instance
  // shows all relevant vote icons instead of just grab or woot.
  showVote() {
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
  },
});

export default MehIcon;
