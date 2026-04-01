/* ─── Metfone Smart HR — App Bootstrap ─── */

Router.register('/jobs', function() {
  return Router.routes['/home']();
});

document.addEventListener('DOMContentLoaded', () => {
  Router.start();
});
