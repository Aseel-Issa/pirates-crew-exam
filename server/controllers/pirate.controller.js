const {PirateModel} = require('../models/Pirate')


const save = async function (pirateObj) {
    try {
      const pirate = new PirateModel(pirateObj)
      const response = await pirate.save()
      return response
    } catch (e) {
      return e.toString()
    }
  
  }

  const getAll = async function (){
      try{
        // const response = await PirateModel.find({}, null, {sort: {name: 1}})
        const response = await PirateModel.find({}).sort({name: 1}).collation({ locale: "en", caseLevel: true })
        return response
      }catch(e){
          return e.toString()
      }
  }


  const remove = async function (pirateObj){
    try{
        const response = await PirateModel.deleteOne(pirateObj)
        return response
      }catch(e){
          return e.toString()
      }
  }

  module.exports = {
      save,
      getAll,
      remove
  }