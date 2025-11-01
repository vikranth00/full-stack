const express = require('express');
const app = express();
const port = 3000;

const seats = {
  1: { status: 'available', lockedUntil: null },
  2: { status: 'available', lockedUntil: null },
  3: { status: 'available', lockedUntil: null },
  4: { status: 'available', lockedUntil: null },
  5: { status: 'available', lockedUntil: null },
};

app.use(express.json());

// Add this new route to handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Ticket Booking API!');
});

app.get('/seats', (req, res) => {
  for (const id in seats) {
    const seat = seats[id];
    if (seat.status === 'locked' && seat.lockedUntil < Date.now()) {
      seat.status = 'available';
      seat.lockedUntil = null;
    }
  }
  res.json(seats);
});

app.post('/lock/:id', (req, res) => {
  const seatId = req.params.id;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found.' });
  }

  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat is already booked.' });
  }

  if (seat.status === 'locked') {
    if (seat.lockedUntil > Date.now()) {
      return res.status(400).json({ message: 'Seat is already locked.' });
    } else {
      seat.status = 'locked';
      seat.lockedUntil = Date.now() + 60000;
      res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
    }
  } else {
    seat.status = 'locked';
    seat.lockedUntil = Date.now() + 60000;
    res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
  }
});

app.post('/confirm/:id', (req, res) => {
  const seatId = req.params.id;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found.' });
  }

  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat is already booked.' });
  }

  if (seat.status === 'locked' && seat.lockedUntil > Date.now()) {
    seat.status = 'booked';
    seat.lockedUntil = null;
    return res.json({ message: `Seat ${seatId} booked successfully!` });
  } else {
    return res.status(400).json({ message: 'Seat is not locked or the lock has expired and cannot be booked.' });
  }
});

app.listen(port, () => {
  console.log(`Booking system API running at http://localhost:${port}`);
});