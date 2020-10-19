import { FormGroup, FormsModule } from "@angular/forms";
import * as _ from "lodash";
import { ToastrService } from "ngx-toastr";

export class Utils {
    static isMobile() {
        return window && window.matchMedia("(max-width: 767px)").matches;
    }
    static ngbDateToDate(ngbDate: { month, day, year }) {
        if (!ngbDate) {
            return null;
        }
        return new Date(`${ngbDate.month}/${ngbDate.day}/${ngbDate.year}`)
    }
    static dateToNgbDate(date: Date) {
        if (!date) {
            return null;
        }
        return { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear() }
    }
    static scrollToTop(selector: string) {
        if (document) {
            let element = <HTMLElement>document.querySelector(selector);
            element.scrollTop = 0;
        }
    }

    static dispatchErrors(form: FormGroup, errors: any) {

        console.log(errors);

        errors.forEach(error => {
            if (error.property === 'none') {
                form.setErrors({ _: error.message });
            }
            else if (form.contains(error.property.toLowerCase())) {
                form.controls[error.property.toLowerCase()].setErrors({ dispatched: error.message });
            }
        });

        console.log(form);
    }
}