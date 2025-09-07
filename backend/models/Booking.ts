import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
dateTime: { type: Date, required: true },
status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
}, { timestamps: true });


export default mongoose.model('Booking', bookingSchema);