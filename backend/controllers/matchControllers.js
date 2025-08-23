const supabase = require("../config/supabase-config.js");

const toggleCompleted = async (req, res) => {
  try {
    const id = req.params.id; // uuid
    const {
      completed
    } = req.body;

    const { data: updateData, error: updateError } = await supabase
      .from("Matches")
      .update({
        completed:!completed
      })
      .eq("id", id) // matches uuid
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res
        .status(500)
        .json({ success: false, message: "Failed to mark as completed" });
    }

    return res.status(200).json({
      success: true,
      message: "Match marked as completed",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getMatches = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Matches")
      .select(
        `id, category, completed,
         team1:team1_id ( id, player, gender, phone, eventId, eligible ),
         team2:team2_id ( id, player, gender, phone, eventId, eligible )`
      );


    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Supabase error" });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ success:false,message: "No Matches found",data:[] });
    }

    return res.status(200).json({ success: true, message: "fetched Match details", data: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const saveMatches = async (req, res) => {
  try {
    const {
      matches
    } = req.body;

   const { data, error } = await supabase
      .from("Matches")
      .insert(
        matches.map((m) => ({
          team1_id: m.team1.id,
          team2_id: m.team2 ? m.team2.id : null,
          category: m.category,
          completed: m.completed ?? false,
        }))
      )
      .select();


    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ success: false, message: "Failed to create match" });
    }

    return res.status(200).json({ success: true, message: "match created successfully", data: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const clearMatches = async(req,res) => {
    try{
        const { data: updateData, error: updateError } = await supabase
        .from("Matches")
        .delete()
        .neq("id", 0)

        if (updateError) {
          console.error("Supabase Delete error:", updateError);
          return res.status(500).json({ success: false, message: "Failed to Clear existing matches" });
        }

        return res.status(201).json({ success: true, message: "Existing Matches Cleared successfully" });
    }
    catch(error)
    {
        console.error("Unexpected error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = {
  getMatches,saveMatches,toggleCompleted,clearMatches
};
