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
            /*var date: Date = todo.todoDate ?? new Date();
            if (!todo.todoDate) {
                // todo is not scheduled, schedule it for 1 hour from now
                date.setHours(date.getHours() + 1);
                // date.setSeconds(date.getSeconds() + 1); 
            }*/

            var tempDate = new Date();
            tempDate.setHours(tempDate.getHours() + 1);
            try {
                this.schedule(todo.todoDate ?? tempDate,
                    todo.todoTitle.toString() == "" ? "Todo Reminder" : todo.todoTitle.toString(),
                    todo.todoDescription?.toString() ?? "");
            } catch (ex) {
                this.schedule(tempDate,
                    todo.todoTitle.toString() == "" ? "Todo Reminder" : todo.todoTitle.toString(),
                    todo.todoDescription?.toString() ?? "");
            }
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
    public async schedule(date: Date | null = null, title: string = "Title", body: string = "Notification") {
        try {
            // Request check permissions
            if (!(await LocalNotifications.requestPermissions()).display) return;

            // check if date is in the past)
            if (date == null) return;
            var tempDate = new Date(date);
            tempDate.setHours(tempDate.getHours() - 2);
            date = tempDate;

            var isPast = new Date(date).getTime() < new Date().getTime();
            if (isPast) return;
            
            try {
                await LocalNotifications.schedule({
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
                console.log("Scheduled Notification for", title, (date));
            } catch (ex) {
                console.log("Error scheduling notification", title, ex);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const instance = new NotificationUtils();
export default instance;