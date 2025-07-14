const table = document.getElementById('campaign-table')
const search = document.getElementById('campaignSearch')
const options = document.getElementById('campaignFilter')
const form = document.getElementById('campaignForm')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const query = search.value.trim().toLowerCase()
    const selectedColumn = options.value;

    const rows = table.querySelectorAll('tbody tr')

    console.log(rows)

    rows.forEach((row) => {
        let valueToCheck = "";

        switch (selectedColumn) {
            case "name":
                valueToCheck = row.querySelector('[data-label="Campaign Name"]').textContent;
                break;
            case "tags":
                valueToCheck = row.querySelector('[data-label="Target Tags"]').textContent;
                break;
            case "startDate":
                valueToCheck = row.querySelector('[data-label="Start Date"]').textContent;
                break;
            case "endDate":
                valueToCheck = row.querySelector('[data-label="End Date"]').textContent;
                break;
            case "workspace":
                valueToCheck = row.querySelector('[data-label="Workspace"]').textContent;
                break;
            default:
                valueToCheck = "";
        }

        if (valueToCheck.toLowerCase().includes(query)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    })

})


//form-modal-start
const addButton = document.getElementById('add-campaign');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-modal');
const addContact = document.getElementById('campaignAdd')
const campaignTbody = document.querySelector('#campaign-table tbody')

addButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

addContact.addEventListener('submit', function (e) {
    e.preventDefault();

    const campaignName = document.getElementById('name').value;
    const tags = document.getElementById('tags').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const workspace = document.getElementById('workspace').value;

    const row = document.createElement('tr');

    row.innerHTML = `
    <td data-label="Campaign Name">${campaignName}</td>
    <td data-label="Status">Draft</td>
    <td data-label="Target Tags">${tags}</td>
    <td data-label="Start Date">${startDate}</td>
    <td data-label="End Date">${endDate}</td>
    <td data-label="Workspace">${workspace}</td>
    <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
    `;

    campaignTbody.appendChild(row); 
    modal.style.display = 'none';
    addContact.reset()
})
//form-modal-end

