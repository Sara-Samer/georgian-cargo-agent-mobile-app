import vest, {validate, test, enforce} from "vest";
import {truncate} from "_utils";

const receiverValidations = (data, field) => {
    return validate("AddReciever", () => {
        vest.only(field);

        [
            "name",
            "email",
            "phone",
            "country_code",
            "address_line_1",
            // "address_line_2",
            "postal_code",
        ].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });

        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", trimmedEmail + "is not valid email address", () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });
    });
};

export default receiverValidations;
