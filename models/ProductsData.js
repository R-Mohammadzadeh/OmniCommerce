import mongoose, { Schema, model, models } from "mongoose";


const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Name oder ID des Benutzers
  rating: { 
    type: Number, 
    required: true,
    min: 1, // Mindestens 1 Stern
    max: 5  // Maximal 5 Sterne
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/**
 * productSchema: Das Hauptschema für die Produktdaten in deinem Shop.
 */
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Ein Produktname ist erforderlich"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Eine Beschreibung ist erforderlich"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Ein Preis ist erforderlich"],
    min: 0, // Verhindert negative Preise
  },
  category: {
    type: String,
    required: [true, "Eine Kategorie ist erforderlich"],
    // Erlaubt nur vordefinierte Werte
    enum: {
      values: ['camera', 'laptop', 'mobile', 'tablet', 'playstation'],
      message: "{VALUE} ist keine gültige Kategorie"
    },
  },
  brand: {
    type: String,
    required: [true, "Eine Marke ist erforderlich"],
    trim: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0 // Der Lagerbestand kann nicht unter 0 sinken
  },
  image: [{  // Array von Strings für Cloudinary-URLs
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  // Liste eingebetteter Bewertungen
  reviews: [ReviewSchema],
  numReviews: {
    type: Number,
    default: 0,
  }
}, { 
  // Erzeugt automatisch 'createdAt' und 'updatedAt' Zeitstempel
  timestamps: true 
});

const ProductsData = models.ProductsData || model('ProductsData', productSchema, 'productsDatas');

export default ProductsData;