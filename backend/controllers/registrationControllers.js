const supabase = require("../config/supabase-config.js");

const getRegister = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Registration").select("*").order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase error" });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ success:true, message: "No Registered Players found",data: data });
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

const updateRegistration = async (req, res) => {
  try {
    const id = req.params.id; // uuid
    const {
      name1,
      phone1,
      gender1,
      name2,
      phone2,
      gender2 = "",
      eventId, // int8
    } = req.body;

    const { data: updateData, error: updateError } = await supabase
      .from("Registration")
      .update({
        player: { name1, name2 },
        gender: { gender1, gender2 },
        phone: { phone1, phone2 },
        eventId, // keep eventId as int8
      })
      .eq("id", id) // matches uuid
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update Registration" });
    }

    return res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



const deleteRegistration = async(req,res) => {
    const id = req.params.id;
    try{
        const { data: deleteData, error: deleteError } = await supabase
        .from("Registration")
        .delete()
        .eq("id", id)

        if (deleteError) {
          console.error("Supabase delete error:", deleteError);
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

const toggleEligibility = async (req, res) => {
  try {
    const id = req.params.id; // uuid
    const {
      eligible
    } = req.body;

    const { data: updateData, error: updateError } = await supabase
      .from("Registration")
      .update({
        eligible:!eligible
      })
      .eq("id", id) // matches uuid
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res
        .status(500)
        .json({ success: false, message: "Failed to toggle eligibility" });
    }

    return res.status(200).json({
      success: true,
      message: "Eligibility status updated",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  getRegister,register,updateRegistration,deleteRegistration,toggleEligibility
};

