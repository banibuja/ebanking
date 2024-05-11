function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email format is incorrect";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password format is incorrect";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;
