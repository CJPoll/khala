import Reflux from 'reflux';
import User from 'user';
import NotificationActions from 'notificationActions';

const UserActions = Reflux.createActions({
	register: {children: ['completed', 'failed']}
});

UserActions.register.listen((name, email, password, passwordConfirmation) => {
	User.create(name, email, password, passwordConfirmation)
	.then((result) => NotificationActions.notify('Registration Successful'))
	.catch((result) => this.failed(result.data));
})

export default UserActions;
