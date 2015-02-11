function validate(frm){

    if(frm.lastName.value.length < 2){
        generate('error', 'Please Enter a number');
        return false;
    }

    if(frm.lastName.value.length < 2){
        generate('error', 'Please Enter Last Name');
        return false;
    }

    if(frm.dateOfBirth.value.length < 5){
        generate('error', 'Please your Date of Birth');
        return false;
    }

    if(!validateEmail(frm.email.value)){
        generate('error', 'Please Enter a valid Email Address');
        return false
    }

    formSubmit = true;
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function generate(type, text) {

    var notyContainer = $('div#customContainer');
    notyContainer.noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        layout      : 'topCenter',
        theme       : 'relax',
        maxVisible  : 10
    });
}
