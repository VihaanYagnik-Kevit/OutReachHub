const mongoose = require("mongoose")

const Contacts = require('../models/contacts')

exports.contact_get_all = (req,res,next) => {
    Contacts.find()
        .select("name", "contactInfo" , "company" , "jobTitle" , "Tags")
}