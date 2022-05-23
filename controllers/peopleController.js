const db = require("../models/index.js");
const Attributes = require("../utils/attributes").Attributes;
const fs = require('fs')

//create main model
const People = db.people;

//1. add adult member

const getPersonByQuery = async (req, res) => {
  const { accountId } = req.user;
  const query = req.query;
  const memberType = req.params.memberType;
  let queryKey = Object.keys(query)[0];
  let queryVal = Object.values(query)[0];

  try {
    let persons;
    if (!queryKey) {
      persons = await People.findAll({
        where: { memberType, accountId },
        attributes: Attributes[memberType],
      });
    } else {
      persons = await People.findAll({
        where: { [`${queryKey}`]: queryVal, memberType, accountId },
        attributes: Attributes[memberType],
      });
    }

    if (!persons) {
      res.status(404).send("No records found");
    }

    res.status(200).send(persons);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addPerson = async (req, res) => {
  const { userId, accountId } = req.user;

  req.body.currentUserId = userId;
  req.body.accountId = accountId;
  req.body.memberType = req.params.memberType;
  if (req.file) {
    req.body.image = req.file.path ? req.file.path : "";
  }

  try {
    const adultmembers = await People.create(req.body);
    res.status(200).send(adultmembers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePerson = async (req, res) => {
  const { userId, accountId } = req.user;
  const {id} = req.params;

  req.body.currentUserId = userId;
  req.body.accountId = accountId;


  try {
    let person = await People.findOne({ where: { id,accountId } });

     person.set(req.body)
     let updatePerson =  await person.save();
    res.status(200).send(updatePerson);
  } catch (error) {
    res.status(500).send(error);
  }
};


const getPersonById =async(req, res)=>{
  try {
    const { accountId } = req.user;
  const { memberType,id } = req.params;
  const person = await  People.findOne({ where: { id,accountId }, attributes: Attributes[memberType], });
  res.status(200).send(person);

  } catch (error) {
    console.log(error)
  }
  

}

const removePerson = async (req, res) => {
  const { userId, accountId } = req.user;

  req.body.currentUserId = userId;
  req.body.accountId = accountId;
  const { id } = req.params;

  try {
    // const removeperson = await  People.findOne({ where: { id,accountId }});
    // if(removeperson){
    //   fs.unlinkSync(removeperson)
    // }

    const person = await People.destroy({ where: { id } });

  
    res.status(200).send("done");
  } catch (error) {
    console.log({error});
    res.status(500).send(error);
  }
};

module.exports = {
  addPerson,
  getPersonByQuery,
  removePerson,
  getPersonById,
  updatePerson
};
