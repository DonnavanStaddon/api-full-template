//const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);

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

function generatePaginationButtons(next, previous) {
    if (next && previous) {
        return `<button onclick="writeToDocument('${previous}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !previous) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && previous) {
        return `<button onclick="writeToDocument('${previous}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function (data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            var dataRow = [];

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15)//takes the first 15 characters from row data
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
};