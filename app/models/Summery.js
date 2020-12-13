import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const summerySchema = mongoose.Schema({
    team_name: String,
    wins: Number,
    losses: Number,
    ties: Number,
    score: Number
})
summerySchema.plugin(mongoosePaginate);
var summeryModel = mongoose.model('Summery', summerySchema);

export default summeryModel;