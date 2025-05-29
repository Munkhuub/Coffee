import { prisma } from "../../db";

export const getDonation = async (req, res) => {
  const { userId } = req.params;

  try {
    const donation = await prisma.donation.findFirst({
      where: userId,
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    return res.status(404).json(donation);
  } catch (error) {
    console.error("error fetching donatin", error);
    return res.status(500).json({ message: "server error", error });
  }
};
