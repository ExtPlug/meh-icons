import Plugin from 'extplug/Plugin';
import UserRowView from 'plug/views/rooms/users/RoomUserRowView';
import $ from 'jquery';
import { around } from 'meld';
import defined from 'defined';
import style from './style.css';

const MehIcon = Plugin.extend({
  name: 'Meh Icons',
  description: 'Shows meh icons in the user list next to users who meh\'d ' +
               'the current song.',

  style,

  enable() {
    const plugin = this;
    this.advice = around(UserRowView.prototype, 'vote', function boundToRow() {
      plugin.showVote(this);
    });
  },

  disable() {
    this.advice.remove();
  },

  shouldShowMehs() {
    const user = API.getUser();
    if (user && user.role >= API.ROLE.BOUNCER || user.gRole >= API.ROLE.BOUNCER) {
      return true;
    }
    const rules = this.ext.roomSettings.get('rules');
    return defined(rules && rules.allowShowingMehs, true);
  },

  // shows all relevant vote icons instead of just grab or woot.
  showVote(row) {
    if (row.$icon) row.$icon.remove();
    row.$icon = $();
    if (row.model.get('vote') < 0 && this.shouldShowMehs()) {
      row.$icon = row.$icon.add($('<i />').addClass('icon icon-meh extplug-meh-icon'));
    }
    if (row.model.get('vote') > 0) {
      row.$icon = row.$icon.add($('<i />').addClass('icon icon-woot'));
    }
    if (row.model.get('grab')) {
      row.$icon = row.$icon.add($('<i />').addClass('icon icon-grab'));
    }
    row.$icon.appendTo(row.$el);
  },
});

export default MehIcon;
