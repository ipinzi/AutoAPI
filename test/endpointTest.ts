fetch('http://localhost:4000/nephilim_ressurection/endless_hs/setscore', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([0, 10122])
})
    .then(response => response.json())
    .then(data => console.log("Response from set:", data))
    .catch((error) => {
        console.error('Error:', error);
    });

fetch('http://localhost:4000/nephilim_ressurection/endless_hs/getscore', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([0])
})
    .then(response => response.json())
    .then(data => console.log("Successful Response Baby!", data))
    .catch((error) => {
        console.error('Error:', error);
    });


fetch('http://localhost:4000/nephilim_ressurection/endless_hs/getallscores', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([])
})
    .then(response => response.json())
    .then(data => console.log("Successful Response Baby!", data))
    .catch((error) => {
        console.error('Error:', error);
    });