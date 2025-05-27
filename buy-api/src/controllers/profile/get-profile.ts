import { prisma } from "../../db";

export const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(id) },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
