/* Global Variables */
const apiKey = `aa76de64dd0c533a83cfbb55bdf31b60&units=imperial`;
const generateBut = document.getElementById(`generate`);
/*date*/
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* button(generate) event and func */
generateBut.addEventListener(`click`, () => {
    let zipCode = document.getElementById(`zip`).value
     //let feel = ;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=`;
    apiFetch(apiUrl, apiKey);
});

/* fetch the api and get data */
async function apiFetch(apiurl , apikey) {
    const res = await fetch(apiurl+apikey)
    try {
         theData = await res.json();
       // console.log("this is THEDATA",theData);
    } catch (error) {
        console.log(`error the first fetch`, error);
    }
    postData(`/api`, { data: theData, date: newDate, feeling: document.getElementById(`feelings`).value }).then(getData(`all`));
}

/* post data to server */
async function postData(url = '', datapost = {}) {
    const send = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'  },
        body: JSON.stringify(datapost),
     });
    try {
        const sendJson = await send.json()
        //console.log("this is send json",sendJson);
    } catch (error) {
        console.log(`error at the post in the client`, error);
    }
}

/* get the data from the server */

async function getData(url='') {
    const get = await fetch(url)
    try {
        const getJson = await get.json()
        //console.log("this is get json", getJson);
        let celsius = (getJson.temp - 32) * (5 / 9);
        document.getElementById('temp').innerHTML = `${getJson.temp} &deg f or ${celsius.toFixed(2)} &deg c`;
        document.getElementById('date').innerHTML = getJson.date;
        document.getElementById('content').innerHTML = getJson.feelings;
        document.getElementById('country').innerHTML = getJson.country;
        
    } catch (error) {
        console.log(`error at the get in the client`, error);
    }
}

