import { prisma } from "../../db";

export const createDonationController = async (req, res) => {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeACoffee,
    donorId,
    recipientId,
  } = req.body;

  try {
    const Donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId,
        recipientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return res
      .status(200)
      .json({ message: "Donation created succesfully", Donation });
  } catch (error) {
    console.error("Failed to create donation", error);
  }
};
