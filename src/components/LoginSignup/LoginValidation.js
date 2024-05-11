function Valdiation(values){
    alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(values.email === ""){
        error.email = "Name should not be empty"
    } else if(!email_pattern.test(values.email)){
        error.email = "email didnt match"
    }else error.email = ""


if(values.password === ""){
    error.password = "Name should not be empty"
} else if(!password_pattern.test(values.password)){
    error.password= "email didnt match"
}else { 
    error.password = ""
}
return error;

}

export default Valdiation;
