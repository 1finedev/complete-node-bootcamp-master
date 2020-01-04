const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log('Tour id is ' + val)
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status : 'Fail',
      message : 'Missing name or price'
    })
  }
  next();
};


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requesTime,
    results: tours.length,
    data: {
      tours: tours // If they have the same name, you just can write tours once like this {tours}
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requesTime,
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/daa/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        res.status(404);
        console.log('Error !');
      }
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};