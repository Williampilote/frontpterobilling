async function formatUptime(s) {
  if (s === 0) return "stopped";
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var seconds = s % 60;
  s = (s - seconds) / 60;
  var minutes = s % 60;
  s = (s - minutes) / 60;
  var hours = s % 24;
  s = (s - hours) / 24;
  var days = s;
  console.log(days);

  if (days > 0) {
    return pad(days, 3) + "d " + pad(hours, 2) + "m " + pad(minutes, 2) + "s ";
  }

  return pad(hours, 2) + "h " + pad(minutes, 2) + "m " + pad(seconds, 2) + "s ";
}
export { formatUptime };
