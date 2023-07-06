const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");

    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(data = JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var getTableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        getTableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${getTableHeaders}</tr>`;
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function (data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            //el.innerHTML += "<p>" + item.name + "</p>";
        });
        el.innerHTML = `<table>${tableHeaders}</table>`
    });
};