import { Injectable } from "@angular/core";
import Swal from 'sweetalert2'

@Injectable()
export class Alert {
    constructor() {

    }

    error: string = "Hata";
    systemError: string = "Backend Hata";
    successTitle: string = "Başarılı";
    warningTitle: string = "Uyarı";

    errorType: string = "error";
    successType: string = "success";
    warningType: string = "warning";

    swal(title: string, message: string, type: any) {
        Swal.fire(title, message, type);
    }

    confirm(title: any, message: any, type: any, confirmButtonText: any, callback: any) {
        Swal.fire({
            title: title,
            text: message,
            type: type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.value) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}