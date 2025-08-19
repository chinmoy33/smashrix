const supabase = require("../config/supabase-config.js");

const getHostedEvents = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Events").select("*").order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No Events found" });
    }

    return res.status(200).json({ success: true, message: "fetched Event details", data: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const hostEvent = async (req, res) => {
  try {
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

    const { data: insertData, error: insertError } = await supabase
      .from("Events")
      .insert({
        interested,
        type_of_mutual_fund,
        amount,
        final_amount,
        kyc_completed,
        final_disbursed_amt:new_final_disbursed_amt,
      })
      .select();

    if (insertError) {
      console.error("Supabase update error:", insertError);
      return res.status(500).json({ success: false, message: "Failed to create Event" });
    }

    return res.status(200).json({ success: true, message: "Event created successfully", data: insertData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
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
      .from("Events")
      .update({
        interested,
        type_of_mutual_fund,
        amount,
        final_amount,
        kyc_completed,
        final_disbursed_amt:new_final_disbursed_amt,
      })
      .eq("Event_id", id)
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res.status(500).json({ success: false, message: "Failed to update Event" });
    }

    return res.status(200).json({ success: true, message: "Event updated successfully", data:updateData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteEvent = async(req,res) => {
    const id = req.params.id;
    try{
        const { data: updateData, error: updateError } = await supabase
        .from("Events")
        .delete()
        .eq("Event_id", id)

        if (updateError) {
          console.error("Supabase update error:", updateError);
          return res.status(500).json({ success: false, message: "Failed to Delete Event" });
        }

        return res.status(201).json({ success: true, message: "Event deleted successfully" });
    }
    catch(error)
    {
        console.error("Unexpected error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = {
  getHostedEvents,hostEvent,updateEvent,deleteEvent
};

