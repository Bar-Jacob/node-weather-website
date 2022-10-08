console.log('Client side javascript file is loaded!');
var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
weatherForm === null || weatherForm === void 0 ? void 0 : weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var location = search === null || search === void 0 ? void 0 : search.value;
    if (messageOne === null || messageTwo === null)
        return;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    // will use the port were on automatically (local to heroku)
    fetch("/weather?address=".concat(location)).then(function (response) {
        response.json().then(function (data) {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        });
    });
});
