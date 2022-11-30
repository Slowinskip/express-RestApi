
const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
        try {
        res.json(await Concerts.find({}));
      } catch (err) {
        res.status(500).json({ message: err });
      }    
}
exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const conc = await Concert.findOne().skip(rand);
        if (!conc) res.status(404).json({ message: 'Not found' });
        else res.json(conc);
      } catch (err) {
        res.status(500).json({ message: 'OK' });
      }
    
}
exports.getById = async (req, res) => {
  try {
    const dep = await Concerts.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}
exports.post = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcerts = new Concerts({ performer: performer, genre: genre, price: price, day: day, image: image, });
        await newConcerts.save();
        res.json({ message: 'OK' });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    
}
exports.edit = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const dep = await Concerts.findById(req.params.id);
      if(dep) {
        await Concerts.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
   
}
exports.delete = async (req, res) => {
    try {
        const dep = await Concerts.findById(req.params.id);
        if(dep) {
          await Concerts.deleteOne({ _id: req.params.id });
          res.json(await Concerts.find());
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
}
exports.getaAll = async (req, res) => {
    
}