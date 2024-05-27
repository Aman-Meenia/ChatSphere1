// <-------------------------------------Create Room------------------------------------->

export const createRoom = async (req, res) => {
  try {
  } catch {
    console.log("Error in createRoom , chatController");

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
