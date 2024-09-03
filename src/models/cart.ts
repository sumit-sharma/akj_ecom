import { Document, model, Schema } from "mongoose";



export type TCart = 
{
    user_id: string;
    product_uid: string;
    variety: string;
    price: number;
    quantity: number;
    additional_remark: string;
    cart_type?: string;
  };


  export interface ICart extends TCart, Document {}

  const cartSchema = new Schema<ICart>({
    user_id: {type: String, required: true},
    product_uid: {type: String, required: true},
    variety: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    additional_remark: {type: String},
    cart_type: {type: String},
  });

  const Cart = model<ICart>('Cart', cartSchema);
  export default Cart;
  





  