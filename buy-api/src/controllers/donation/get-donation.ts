import { prisma } from "../../db";

export const getDonations = async (req, res) => {
  const { userId } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
    });

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: "No donations found" });
    }

    return res.status(200).json({ donations });
  } catch (error) {
    console.error("Error fetching donations", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
