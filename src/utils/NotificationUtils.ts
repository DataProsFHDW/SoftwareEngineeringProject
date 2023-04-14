import { LocalNotifications } from '@capacitor/local-notifications';
import { ITodoGroup } from '../models/ITodo';

/**
 * NotificationUtils is a singleton class that handles all local notifications
 */
class NotificationUtils {
    notificationCount: number = 0;

    /**
     * Schedules all todos in the todoList
     * @param todoList The list of todos to schedule
     */
    public async scheduleAllTodos(todoList: ITodoGroup[]) {
        if (!(await LocalNotifications.requestPermissions()).display) return;

        this.clearAllNotifications();
        todoList.forEach((todo) => {
            var date: Date = todo.todoDate ?? new Date();
            if (!todo.todoDate) {
                // todo is not scheduled, schedule it for 1 hour from now
                date.setHours(date.getHours() + 1);
                // date.setSeconds(date.getSeconds() + 1); 
            }

            this.schedule(date,
                todo.todoTitle.toString() == "" ? "Todo Reminder" : todo.todoTitle.toString(),
                todo.todoDescription?.toString() ?? "");
        });
    }

    /**
     * Clears all notifications
     * @param todoList The list of todos to schedule
     */
    public async clearAllNotifications() {
        if (!(await LocalNotifications.requestPermissions()).display) return;

        // Clear old notifications in prep for refresh (OPTIONAL)
        const pending = await LocalNotifications.getPending();
        if (pending.notifications.length > 0)
            await LocalNotifications.cancel(pending);

        this.notificationCount = 0;
        console.log('Cleared all notifications');
    }


    /**
     * Schedules a single notification
     * @param date The date to schedule the notification for
     * @param title The title of the notification
     * @param body The body of the notification
     */
    public async schedule(date: Date = new Date(), title: string = "Title", body: string = "Notification") {
        try {
            // Request check permissions
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

const instance = new NotificationUtils();
export default instance;