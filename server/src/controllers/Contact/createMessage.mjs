import Contact from "../../models/Contact.mjs";

export const createMessage = async (req,res) => {
    try{ 
        const {name , message , email} = req.body;
        if(!name || !message || !email ){
            return res.status(400).json("Please, Enter name,email,and message");
        }
        const contact = await Contact.create({name , email , message});
        return res.status(201).json( contact);
    }catch(err){
        return res.status(500).json({msg : err.message});
    }
}