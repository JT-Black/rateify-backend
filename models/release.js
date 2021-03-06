import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const releaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artwork: { type: String },
    genres: { type: Array },
    releaseYear: { type: Number },
    url: { type: String },
    artist: { type: mongoose.Schema.ObjectId, ref: 'Artist', required: true },
    likes: { type: mongoose.Schema.ObjectId, ref: 'User' },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

releaseSchema.virtual('averageRating').get(function () {
  if (!this.reviews.length) return '0';
  const sumOfRatings = this.reviews.reduce((acc, review) => {
    if (!review.rating) return acc;
    return acc + review.rating;
  }, 0);
  return (sumOfRatings / this.reviews.length).toFixed(1);
});

releaseSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Release', releaseSchema);
