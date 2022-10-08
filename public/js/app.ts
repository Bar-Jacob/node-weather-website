console.log('Client side javascript file is loaded!');

const weatherForm: HTMLFormElement | null = document.querySelector('form');
const search: HTMLInputElement | null = document.querySelector('input');
const messageOne: HTMLElement | null = document.querySelector('#message-1');
const messageTwo: HTMLElement | null = document.querySelector('#message-2');

weatherForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const location: string | undefined = search?.value;

    if (messageOne === null || messageTwo === null) return;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    // will use the port were on automatically (local to heroku)
    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        })
    })
})