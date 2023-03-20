import { LocalNotifications } from '@capacitor/local-notifications';

class NotificationUtils {
    notificationCount: number = 0;

    public async clearAllNotifications() {
        if (!(await LocalNotifications.requestPermissions()).display) return;

        // Clear old notifications in prep for refresh (OPTIONAL)
        const pending = await LocalNotifications.getPending();
        if (pending.notifications.length > 0)
            await LocalNotifications.cancel(pending);

        this.notificationCount = 0;
        console.log('Cleared all notifications');
    }


    public async schedule(date: Date = new Date(), title: string = "Title", body: string = "Notification") {
        try {
            // Request/ check permissions
            if (!(await LocalNotifications.requestPermissions()).display) return;

            LocalNotifications.schedule({
                notifications: [{
                    title: title,
                    body: body,
                    id: this.notificationCount++,
                    schedule: {
                        at: date,
                        allowWhileIdle: true,
                    }
                }]
            });

            console.log('Scheduled notification', date);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NotificationUtils()