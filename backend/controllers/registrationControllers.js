const supabase = require("../config/supabase-config.js");

const getRegister = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Registration").select("*").order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No Registered Players found" });
    }

    return res.status(200).json({ success: true, message: "fetched registration details", data: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const register = async (req, res) => {
  const id= req.params.id;
  try {
    const {
      name1,
      phone1,
      gender1,
      name2,
      phone2,
      gender2=""
    } = req.body;
  
    const { data: insertData, error: insertError } = await supabase
      .from("Registration")
      .insert({
        player:{name1,name2},
        gender:{gender1,gender2},
        phone:{phone1,phone2},
        eventId: id
      })
      .select();

    if (insertError) {
      console.error("Supabase update error:", insertError);
      return res.status(500).json({ success: false, message: "Failed to register player" });
    }

    return res.status(200).json({ success: true, message: "Player registered successfully", data: insertData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateRegister = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      interested,
      contacted,
      type_of_mutual_fund,
      amount,
      final_amount,
      kyc_completed=false,
      final_disbursed_amt,
    } = req.body;
    
    let new_final_disbursed_amt=null
    if(!kyc_completed && interested==="yes")
    {
      new_final_disbursed_amt=0;
    }
    else
    {
      new_final_disbursed_amt=final_disbursed_amt
    }

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing ID parameter" });
    }
    
    const { data: updateData, error: updateError } = await supabase
      .from("Registration")
      .update({
        interested,
        type_of_mutual_fund,
        amount,
        final_amount,
        kyc_completed,
        final_disbursed_amt:new_final_disbursed_amt,
      })
      .eq("Registration_id", id)
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res.status(500).json({ success: false, message: "Failed to update Registration" });
    }

    return res.status(200).json({ success: true, message: "Registration updated successfully", data:updateData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteRegister = async(req,res) => {
    const id = req.params.id;
    try{
        const { data: updateData, error: updateError } = await supabase
        .from("Registration")
        .delete()
        .eq("Registration_id", id)

        if (updateError) {
          console.error("Supabase update error:", updateError);
          return res.status(500).json({ success: false, message: "Failed to Delete registration" });
        }

        return res.status(201).json({ success: true, message: "Registration deleted successfully" });
    }
    catch(error)
    {
        console.error("Unexpected error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = {
  getRegister,register,updateRegister,deleteRegister
};

