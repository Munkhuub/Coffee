import { prisma } from "../../db";

export const updateProfileById = async (req, res) => {
  const { id } = req.params;
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
      where: { id: Number(id) },
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
