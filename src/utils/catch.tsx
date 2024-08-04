import Swal from 'sweetalert2';

export const Catch = (error: any) => {
    console.warn("error", error);
    if (error.response && error.response.status === 401) {
        window.location.href = "";
    }

    if (error.response.status === 401) {
        return Swal.fire("Error", error.response.data.errors[0].detail, "error")
    }

    let message = error?.response?.data?.errors[0]?.detail ? error?.response?.data?.errors[0]?.detail : "Ha ocurrido un error, contacte al administrador";
    return Swal.fire("Error", message, "error")
}