Swal.fire({
  icon: "success",
  title: "Order Placed",
  text: "Order is Being Prepared",
});

setInterval(function () {
  location.href = "/";
}, 1500);
