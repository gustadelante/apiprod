import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    ancho: Number,
    diametro: Number,
    gramaje: Number,
    peso: Number,
    bobinanro: {type: Number, unique: true},
    ofnro: Number,
    turno: String,
    calidad: String,
    mtslineales: Number,
    producttype: Number
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema);