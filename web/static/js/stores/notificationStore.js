import Reflux from 'reflux';
import NotificationActions from 'notificationActions';

const NotificationStore = Reflux.createStore({
	listenables: NotificationActions,

	onNotify(notification) {
		this.trigger(notification);
	}
});

export default NotificationStore;
