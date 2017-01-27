if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    registration.onupdatefound = _ => {
      const sw = registration.installing;

      sw.onstatechange = _ => {
        if (sw.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            const refresh = confirm('Update Available. Refresh?');
            refresh && location.reload();
          } else {
            alert('This page is now available offline!');
          }
        }
      };
    };
  });
}
