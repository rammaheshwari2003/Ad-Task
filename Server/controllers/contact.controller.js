const EnquiryModel = require('../models/Contact.model');




const ContactProduct = async (req, res) => {
    const {
      name,
      email,
      phone,
      subject,
      message,
      
    } = req.body;

    try {
        const user = await EnquiryModel.create({
          name,
          email,
          phone,
          subject,
          message,
          
        });

        res.status(200).send("User successfully registered!");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("An error occurred during registration.");
    }
};

const ContactDisplay = async(req, res)=>{
  const myData= await EnquiryModel.find()
  res.send(myData)
}




const   RecordDelete = async (req, res) => {
  const { id } = req.params; // Using route parameter instead of body

  try {
      const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);
      
      if (!deletedEnquiry) {
          return res.status(404).json({
              success: false,
              message: "Enquiry not found"
          });
      }

      res.status(200).json({
          success: true,
          message: "Enquiry deleted successfully",
          data: deletedEnquiry
      });
  } catch (error) {
      console.error("Error deleting enquiry:", error);
      res.status(500).json({
          success: false,
          message: "Failed to delete enquiry",
          error: error.message
      });
  }
};


module.exports = {
  ContactProduct, 
  ContactDisplay,
  RecordDelete
};
