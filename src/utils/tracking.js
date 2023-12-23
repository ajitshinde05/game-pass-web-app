export default function tracking(eventName, params) {
  // console.log('environment', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', eventName, { ...params });
  }
}
