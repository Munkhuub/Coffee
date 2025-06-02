import { prisma } from "../../db";

export const updateProfileByUserId = async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    about,
    avatarImage,
    socialMediaUrl,
    backgroundImage,
    successMessage,
  } = req.body;

  try {
    const updatedUser = await prisma.profile.update({
      where: { id: Number(userId) },
      data: {
        name,
        about,
        avatarImage,
        socialMediaUrl,
        backgroundImage,
        successMessage,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ message: "This email is already in use." });
    }

    res.status(500).json({ message: "Server error", error });
  }
};
