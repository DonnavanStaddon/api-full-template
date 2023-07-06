var xhr = new XMLHttpRequest();

xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");

xhr.send();

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(typeof (JSON.parse(this.response)));
    }
};