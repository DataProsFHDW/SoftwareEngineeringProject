import { ReportHandler } from 'web-vitals';

/**
 * Sends metrics to Google Analytics
 * @param onPerfEntry A callback function that will be called after each metric is reported
 * @returns A function that can be called to stop reporting metrics
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
