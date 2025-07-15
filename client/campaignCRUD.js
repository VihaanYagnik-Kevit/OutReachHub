async function fetchCampaigns() {
    const res = await fetch('https://6874f40add06792b9c9604b4.mockapi.io/mock/Campaign');
    const campaigns = await res.json();

    campaignTbody.innerHTML = '';
    campaigns.forEach(campaign => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', campaign.id);
        row.innerHTML = `
            <td data-label="Campaign Name">${campaign.CampaignTitle}</td>
            <td data-label="Status">${campaign.CampaignStatus}</td>
            <td data-label="Target Tags">${campaign.CampaignTags}</td> 
            <td data-label="Start Date">${campaign.CampaignStartDate}</td>
            <td data-label="End Date">${campaign.CampaignEndDate}</td>
            <td data-label="Workspace">${campaign.CampaignWorkspace}</td>
            <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
        `;
        campaignTbody.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', fetchCampaigns);


const table = document.getElementById('campaign-table')
const search = document.getElementById('campaignSearch')
const options = document.getElementById('campaignFilter')
const form = document.getElementById('campaignForm')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const query = search.value.trim().toLowerCase()
    const selectedColumn = options.value;

    const rows = table.querySelectorAll('tbody tr')


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
const addCampaign = document.getElementById('campaignAdd')
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

addCampaign.addEventListener('submit', async function (e) {
    e.preventDefault();

    const campaignName = document.getElementById('name').value;
    const tags = document.getElementById('tags').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const workspace = document.getElementById('workspace').value;

    const row = document.createElement('tr');

    const data = {
        CampaignTitle: campaignName,
        CampaignStartDate: startDate,
        CampaignEndDate: endDate,
        CampaignTags: tags,
        CampaignWorkspace: workspace,
        CampaignStatus: 'Draft'
    }

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

    await fetch('https://6874f40add06792b9c9604b4.mockapi.io/mock/Campaign', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    addCampaign.reset()
})
//form-modal-end


//delete rows-start
campaignTbody.addEventListener('click', async function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
        let row = e.target.closest('tr')
        let id = row.getAttribute('data-id')
        if (confirm("are you sure you want to delete it")) {
            row.remove()
            await fetch(`https://6874f40add06792b9c9604b4.mockapi.io/mock/Campaign/${id}`, {
                method: 'DELETE'
            })
        }
    }
})
//delete rows-end


//editing rows-start
const editCampaign = document.getElementById('campaignEdit')
const editmodal = document.getElementById('editmodal')

campaignTbody.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit') {
        let row = e.target.closest('tr')
        let id = row.getAttribute('data-id')
        const campaignName = row.querySelector('[data-label = "Campaign Name"]').textContent
        const tags = row.querySelector('[data-label = "Target Tags"]').textContent
        const startDate = row.querySelector('[data-label = "Start Date"]').textContent
        const endDate = row.querySelector('[data-label = "End Date"]').textContent
        const workspace = row.querySelector('[data-label = "Workspace"]').textContent

        document.getElementById('nameEdit').value = campaignName
        document.getElementById('tagsEdit').value = tags
        document.getElementById('startDateEdit').value = startDate
        document.getElementById('endDateEdit').value = endDate
        document.getElementById('workspaceEdit').value = workspace

        editmodal.style.display = 'flex';

        editCampaign.addEventListener('submit', async function (e) {
            e.preventDefault()

            const campaignName = document.getElementById('nameEdit').value
            const tags = document.getElementById('tagsEdit').value
            const startDate = document.getElementById('startDateEdit').value
            const endDate = document.getElementById('endDateEdit').value
            const workspace = document.getElementById('workspaceEdit').value

            const data = {
                CampaignTitle: campaignName,
                CampaignStartDate: startDate,
                CampaignEndDate: endDate,
                CampaignTags: tags,
                CampaignWorkspace: workspace,
                CampaignStatus: 'Draft'
            }

            console.log(data)

            row.innerHTML = `
            <td data-label="Campaign Name">${campaignName}</td>
            <td data-label="Status">Draft</td>
            <td data-label="Target Tags">${tags}</td>
            <td data-label="Start Date">${startDate}</td>
            <td data-label="End Date">${endDate}</td>
            <td data-label="Workspace">${workspace}</td>
            <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
            `
            editmodal.style.display = 'none'

            await fetch(`https://6874f40add06792b9c9604b4.mockapi.io/mock/Campaign/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })


        })
    }
})

window.addEventListener('click', (e) => {
    if (e.target === editmodal) {
        editmodal.style.display = 'none';
    }
});

closeModalEdit.addEventListener('click', () => {
    editmodal.style.display = 'none';
});
//editing rows-end


