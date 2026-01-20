import Swal from "sweetalert2";

export const successAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4f46e5", // indigo
  });
};

export const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc2626", // red
  });
};

export const infoAlert = (title, text) => {
  Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonColor: "#4f46e5",
  });
};
