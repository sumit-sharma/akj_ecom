import mongoose, { Document, model, Model, Schema } from "mongoose";

export enum ProductCategory
{
  onlinePuja = "Online Puja",
  gems = "Gems",
  kundali = "Kundali",
  yantra = "Yantra",
  kundaliMatching = "Kundali Matching",
}


 type ProductImage = [];
 export type TProduct = {
  title: string;
  description: string;
  price: number;
  product_category: ProductCategory;
  product_images: ProductImage;
};

export interface IProduct extends TProduct, Document {}


  // const vehicleSchema = new Schema<IProduct>({})

// type ProductModel = Model<IProduct> 
const productSchema = new Schema<IProduct>({
  title: {type: String}, 
  description: {type: String},
  price: {type: Number, required: true},
  product_category: {type: String, required: true, enum: ProductCategory},
  product_images: [{type: String}],
})

const Product = model<IProduct>('Product', productSchema);
export default Product;

