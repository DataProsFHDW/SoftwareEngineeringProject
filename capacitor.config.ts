import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Checkbox',
  webDir: 'build',
  bundledWebRuntime: false,
  hideLogs: false,
  loggingBehavior: "production",
  server: {
    hostname: '127.0.0.1',
    cleartext: true,
    allowNavigation: ['*'],
  },
  android: {
    webContentsDebuggingEnabled: true,
    hideLogs: false,
    loggingBehavior: "production",
    initialFocus: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: { 
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
