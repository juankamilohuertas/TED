if (!("Notification" in window)) {
  console.log("Las notificaciones no están disponibles en tu navegador");
}
Notification.requestPermission();

Notification.requestPermission((e) => {
  if (e == "granted") {
    new Notification("Tienes Una Tarea Pendiente");
  }
});
