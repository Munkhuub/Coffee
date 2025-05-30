import { prisma } from "../../db";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, userId } = req.body;

    const user = prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      (
        await user
      ).password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: `Current password is incorrect` });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        passwordChangedAt: new Date(),
      },
    });
    return res.status(200).json({ message: `Passwor changed succesfully` });
  } catch (error) {
    console.error("Change password error:", error);

    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }

    if (error.message === "Current password is incorrect") {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
