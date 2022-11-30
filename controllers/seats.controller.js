
const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seats.find({}));
      } catch (err) {
        res.status(500).json({ message: err });
      }

}
exports.getById = async (req, res) => {
    try {
        const dep = await Seats.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
}
exports.getRandom = async (req, res) => {
    try {
        const count = await Seats.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const conc = await Seats.findOne().skip(rand);
        if (!conc) res.status(404).json({ message: 'Not found' });
        else res.json(conc);
      } catch (err) {
        res.status(500).json({ message: 'OK' });
      }
    
}
exports.post = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeats = new Seats({ seat:seat, client:client, email: email, day: day});
        await newSeats.save();
        res.json({ message: 'OK' });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    
}
exports.edit = async (req, res) => {
    const { day, seat, client, email } = req.body;

    try {
      const dep = await Seats.findById(req.params.id);
      if(dep) {
        await Seats.updateOne({ _id: req.params.id }, { $set: { seat:seat, client:client, email: email, day: day}});
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
        const dep = await Seats.findById(req.params.id);
        if(dep) {
          await Seats.deleteOne({ _id: req.params.id });
          res.json(await Seats.find());
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    
}