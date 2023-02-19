// Request

const option = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61599e639cmsh766add475f0c45ap10729ajsn71c5b14020c6',
		'X-RapidAPI-Host': 'referential.p.rapidapi.com'
	}
};

initializeCountryOption();

// Get the country select input
const countrySelect = document.querySelector("#country");
countrySelect.addEventListener("change", handleCountrySelection);

const stateSelect = document.querySelector("#state");
    
// Binding submit action
let submitButton = document.querySelector(".profile-card__button");
submitButton.addEventListener("click", handleSubmitButton);
async function handleSubmitButton(event) {
    event.preventDefault();
}


// Function to handle country selection
async function handleCountrySelection(event) {
    const countryCode = event.currentTarget.value;
    
    const stateList = await fetchState(countryCode);
    prefillStateOption(stateList);
}

function prefillStateOption(stateList) {
    // Put the list of countries inside the select input
    let stateOptions = `<option>Select State</option>`;
    
    for (state of stateList) {
        stateOptions = stateOptions + `<option value="${state.key}">${state.value}</option>`;
    }
    
    stateSelect.innerHTML = stateOptions;
}


async function initializeCountryOption() {
    
    // Fetch the list of countries
    const countryList = await fetchCountries();
    
    // Put the list of countries inside the select input
    let countryOptions = `<option>Select Country</option>`;
    
    for (country of countryList) {
        countryOptions = countryOptions + `<option value="${country.iso_a2}">${country.value}</option>`;
    }
    
    countrySelect.innerHTML = countryOptions;
}

async function fetchCountries() {
    try {
        let result = await fetch('https://referential.p.rapidapi.com/v1/country?fields=iso_a2', option);
        if (result.ok) {
            let actualResult = await result.json();
            return actualResult;
        } else {
            throw new Error(result.statusText != "" ? result.statusText : result.status);
        }
    } catch (error) {
        console.log(error)
        errMessage.innerHTML = `
            Error alert, ${error.message};
        `
    }
}

async function fetchState(countryCode) {
    console.log("Calling fetch state")
    if (!countryCode) throw new Error("You must pass the country code.");
    
    try {
        let result = await fetch(`https://referential.p.rapidapi.com/v1/state?iso_a2=${countryCode}`, option);
        if (result.ok) {
            let actualResult = await result.json();
            return actualResult;
        } else {
            throw new Error(result.statusText != "" ? result.statusText : result.status);
        }
    } catch (error) {
        console.log(error)
        errMessage.innerHTML = `
            Error alert, ${error.message};
        `
    }
}
