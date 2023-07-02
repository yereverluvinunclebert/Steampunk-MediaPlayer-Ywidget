/*property
    defaultValue, description, forEach, name, option, push, title, type
*/

"use strict";

function execForm(formDef, formTitle, formButtonOK, formButtonCancel) {
    var formFields = [];
    var formResults;

    formDef.forEach(function (ele) {
        var formField = new FormField();
        formField.name = ele[0];
        formField.title = ele[1];
        formField.type = ele[2];
        formField.option = ele[3];
        formField.defaultValue = ele[4];
        formField.description = ele[5];
        formFields.push(formField);
    });

    formResults = form(formFields, formTitle, formButtonOK, formButtonCancel);
    return formResults;
}

function inputForm(formTitle, formButtonOK, formButtonCancel) {
    var link;
    var linkDesc = "Enter the URL of a remote media file.";
    var formDef = [
        ["link", "URL:", "text", [""], "http://", linkDesc]
    ];
    var formResults = execForm(formDef, formTitle, formButtonOK, formButtonCancel);
    var result = null;

    if (formResults !== null) {
        link = formResults[0];
        result = link;
    }
    return result;
}


function searchForm(formTitle, formButtonOK, formButtonCancel) {
    var link;
    var linkDesc = "The name of the track to search for?";
    var formDef = [
        ["link", "String:", "text", [""], "", linkDesc]
    ];
    var formResults = execForm(formDef, formTitle, formButtonOK, formButtonCancel);
    var result = null;

    if (formResults !== null) {
        link = formResults[0];
        result = link;
    }
    return result;
}

//alert(inputForm("Remote Media File", "Save", "Cancel"));
