//filter-contact-table-start
const contactInput = document.getElementById("searchContact");
const contactType = document.getElementById("contactOptions");
const contactTable = document.getElementById("contact-table");
const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = contactInput.value.trim().toLowerCase();
    const selectedColumn = contactType.value;

    console.log(selectedColumn)

    const rows = contactTable.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        let valueToCheck = "";

        switch (selectedColumn) {
            case "Name":
                valueToCheck = row.querySelector('[data-label="Names"]').textContent;
                break;
            case "Tags":
                valueToCheck = row.querySelector('[data-label="Tags"]').textContent;
                break;
            case "Phone":
                valueToCheck = row.querySelector('[data-label="Phone"]').textContent;
                break;
            case "Email":
                valueToCheck = row.querySelector('[data-label="Email"]').textContent;
                break;
            case "Job Title":
                valueToCheck = row.querySelector('[data-label="Job Title"]').textContent;
                break;
            case "Workspace":
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
    });
});
//filter-contact-table-end

//form-modal-start
const addButton = document.getElementById('add-contact');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-modal');
const addContact = document.getElementById('contact-form')
const contactTbody = document.querySelector('#contact-table tbody')

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

    const company = document.getElementById('companyContact').value
    const name = document.getElementById('nameContact').value
    const tags = document.getElementById('tagsContact').value
    const phone = document.getElementById('phoneContact').value
    const email = document.getElementById('emailContact').value
    const job = document.getElementById('jobContact').value
    const workspace = document.getElementById('workspaceContact').value


    const row = document.createElement('tr')

    row.innerHTML = `
                <td data-label="Company">${company}</td>
                <td data-label="Names">${name}</td>
                <td data-label="Tags">${tags}</td>
                <td data-label="Phone">${phone}</td>
                <td data-label="Email">${email}</td>
                <td data-label="Job Title">${job}</td>
                <td data-label="Workspace">${workspace}</td>
                <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
    `
    contactTbody.appendChild(row);
    modal.style.display = 'none'
    addContact.reset()
})
//form-modal-end

//deleting row for contact-start
contactTbody.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
        let row = e.target.closest('tr')
        if (confirm('are you sure you want to delete')) {
            row.remove()
        }
    }
})
//deleting row for contact-end

//editing row for contact-start
const editmodal = document.getElementById('editmodal');
const closeModalEdit = document.getElementById('close-modalEdit');
const editBtn = document.getElementById('editContact')

contactTbody.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit') {
        let row = e.target.closest('tr')
        console.log(row)

        const company = row.querySelector('[data-label = "Company"]').textContent
        const name = row.querySelector('[data-label = "Names"]').textContent
        const tags = row.querySelector('[data-label = "Tags"]').textContent
        const phone = row.querySelector('[data-label = "Phone"]').textContent
        const email = row.querySelector('[data-label = "Email"]').textContent
        const job = row.querySelector('[data-label = "Job Title"]').textContent
        const workspace = row.querySelector('[data-label = "Workspace"]').textContent

        console.log(job)

        document.getElementById('companyContactEdit').value = company
        document.getElementById('nameContactEdit').value = name
        document.getElementById('tagsContactEdit').value = tags
        document.getElementById('phoneContactEdit').value = phone
        document.getElementById('emailContactEdit').value = email
        document.getElementById('jobContactEdit').value = job
        document.getElementById('workspaceContactEdit').value = workspace

        editmodal.style.display = 'flex';

        editBtn.addEventListener('click', function (e) {
            e.preventDefault()

            const company = document.getElementById('companyContactEdit').value
            const name = document.getElementById('nameContactEdit').value
            const tags = document.getElementById('tagsContactEdit').value
            const phone = document.getElementById('phoneContactEdit').value
            const email = document.getElementById('emailContactEdit').value
            const job = document.getElementById('jobContactEdit').value
            const workspace = document.getElementById('workspaceContactEdit').value

            console.log(company)

            row.innerHTML = `
                <td data-label="Company">${company}</td>
                <td data-label="Names">${name}</td>
                <td data-label="Tags">${tags}</td>
                <td data-label="Phone">${phone}</td>
                <td data-label="Email">${email}</td>
                <td data-label="Job Title">${job}</td>
                <td data-label="Workspace">${workspace}</td>
                <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
            `

            editmodal.style.display = 'none'
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
//editing row for contact-end
