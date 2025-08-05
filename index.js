require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const campaignRoutes = require('./routes/campaign');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


mongoose.connect("mongodb+srv://user:vikash..123@cluster0.wrblu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', campaignRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
