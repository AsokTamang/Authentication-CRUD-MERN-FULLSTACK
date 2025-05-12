import { Staffmodel } from "../models/staffs.models.js";

export const getController = async (req, res) => {
  try {
    const totalStaffs = await Staffmodel.find({});
    if (totalStaffs.length<1) {
      return res
        .status(400)
        .json({ success: false, message: "There is zero number of staff" });
    }
    return res
      .status(200)
      .json({
        success: true,
        data: totalStaffs,
        message: "Successfully retrived",
      });
  } catch (Err) {
    return res.status(500).json({ error: Err.message });
  }
};

export const postController = async (req, res) => {
  try {
    const newStaff = req.body;
    if (
      !newStaff.id ||
      !newStaff.name ||
      !newStaff.age ||
      !newStaff.address ||
      !newStaff.salary ||
      !newStaff.contact
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter all the input fields.",
        });
    }
    const createStaff = new Staffmodel(newStaff); //here we are creating the model with the requested body.
    const finalStaff = await createStaff.save(); //here we are saving the createdStaff
    if (!finalStaff) {
      return res
        .status(500)
        .json({ success: false, message: "Staff doesnot exist." });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Successful creation.",
        data: finalStaff,
      });
  } catch (Err) {
    return res.status(500).json({ error: Err.message });
  }
};

export const putController = async (req, res) => {
  try {
    const id=parseInt(req.params.id)
    const bodyField = req.body;
    if (
        !bodyField.id ||
        !bodyField.name ||
        !bodyField.age ||
        !bodyField.address ||
        !bodyField.salary ||
        !bodyField.contact
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Please enter all the input fields.",
          });
      }

    const findingStaff=await Staffmodel.findOne({id:id});
     if (!findingStaff) {
      return res
        .status(500)
        .json({ success: false, message: "Staff doesnot exist." });
    }
    const updatedStaff = await Staffmodel.findOneAndUpdate({id:id}, bodyField, {
      new: true,
    });
   
   
    return res
      .status(200)
      .json({
        success: true,
        message: "Successful updation",
        data: updatedStaff,
      });
  } catch (Err) {
    return res.status(500).json({ error: Err.message });
  }
};

export const deleteController = async (req, res) => {
  try {
    const id=parseInt(req.params.id)
    
    const deletedStaff = await Staffmodel.findOneAndDelete({id:id});
    if (!deletedStaff) {
      return res
        .status(500)
        .json({ success: false, message: "Staff doesnot exist." });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Successful deletion",
        data: deletedStaff,
      });
  } catch (Err) {
    return res.status(500).json({ error: Err.message });
  }
};


export const getOneController=async(req,res)=>{
  try{
    const id=parseInt(req.params.id);
    const oneStaff= await Staffmodel.findOne({id:id});
    if(!oneStaff){
      return res.status(404).json({success:false,message:'Staff doesnot exist.'})
    }
    return res.status(200).json({success:true,data:oneStaff,message:'Staff info retrieved successfully.'})

  }
  catch(Err){
    return res.status(500).json({success:false,message:'Internal server error'})
  }
}