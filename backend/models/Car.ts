import mongoose from 'mongoose';


const carSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
make: String,
model: String,
year: Number,
price: Number,
pictureUrl: String,
status: { type: String, enum: ['available', 'booked', 'sold'], default: 'available' },
isPaid: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model('Car', carSchema);