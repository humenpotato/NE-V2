const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: 'Bearer 1/1203159670082702:03aac2916a8580f061c75b657604ac75'
    }
};

fetch('https://app.asana.com/api/1.0/workspaces/1203159670125921/tasks/search', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));