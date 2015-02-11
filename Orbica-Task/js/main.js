function validate(frm){

    if(frm.firstName.value.length<2){
        alert("Please Enter First Name");
        return false;
    }

    if(frm.lastName.value.length<2){
        alert("Please Enter Last Name");
        return false;
    }

    if(frm.address1.value.length<5){
        alert("Please Enter Address");
        return false;
    }

    if(frm.city.value.length<2){
        alert("Please Enter City");
        return false;
    }

    if(frm.zip.value.length<5){
        alert("Please Enter Zip Code");
        return false;
    }

    if(frm.state.value.length<1){
        alert("Please Enter State");
        return false
    }

    if(!phonenumber(frm.phone.value)){
        alert("Please Enter a valid Phone Number");
        return false
    }

    if(!validateEmail(frm.email.value)){
        alert("Please Enter a valid Email Address");
        return false
    }

    formSubmit = true;
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function phonenumber(p) {
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = p.replace(/\D/g, "");
    return (digits.match(phoneRe) !== null);
}