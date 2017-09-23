function ajaxRequest(method, url, data, doneCallback, failCallback) {
    $.ajax({
        url: url,
        method: method,
        data: data
    }).done(doneCallback).fail(failCallback);
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function popupAlert(message, alert_classtype, extraFunction_before, extraFunction_after) {
    if (!(extraFunction_before === undefined || extraFunction_before === null)) {
        extraFunction_before();
    }
    $('#floatAlertDiv').addClass(alert_classtype);
    $('#floatAlertDiv').text(message);
    $('#floatAlertDiv').slideDown("slow", function () {
        setTimeout(function () {
            $('#floatAlertDiv').slideUp("slow", function () {
                $('#floatAlertDiv').removeClass(alert_classtype);
                $('#floatAlertDiv').text("");
                if (!(extraFunction_after === undefined || extraFunction_after === null)) {
                    extraFunction_after();
                }
            })
        }, 2000);
    });
}

function ingredientStringToArray(stringData) {
    var ingredientArray = stringData.split(',').map(function (val) { return val.trim() }).filter(Boolean);
    var returnFormat = "";
    for (i = 1; i <= ingredientArray.length; i++) {
        if (i === 1) {
            returnFormat += i + ". " + ingredientArray[i - 1];
        } else {
            returnFormat += "<br>" + i + ". " + ingredientArray[i - 1];
        }
    }
    return returnFormat;
}

function directionStringToArray(stringData) {
    var directionArray = stringData.replace(/(\r\n)|(\n\r)/g, '\n').split('\n').map(function (val) { return val.trim() }).filter(Boolean);
    var returnFormat = "";
    for (i = 1; i <= directionArray.length; i++) {
        if (i === 1) {
            returnFormat += i + ". " + directionArray[i - 1];
        } else {
            returnFormat += "<br>" + i + ". " + directionArray[i - 1];
        }
    }
    return returnFormat;
}

document.addEventListener('DOMContentLoaded', function () {
    if (getUrlParameter('uploadSuccess') === "true") {
        popupAlert("Recipe is uploaded successfully", "alert-ok");
    } else if (getUrlParameter('uploadSuccess') === "false") {
        popupAlert("There is a problem uploading the recipe", "alert-error");
    }
}, false);