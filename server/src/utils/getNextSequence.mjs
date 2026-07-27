import Counter from "../models/Counter.mjs";
export const getNextSequence = async () => {
  const counter = await Counter.findByIdAndUpdate(
    "order_seq"
    ,
    {
        $inc : {seq : 1}
    },
    {new : true , upsert : true}
  );
  return counter.seq;
}