import { getBiddedGigsActivity } from "../services/activity.service.js";
export const getBiddedGigs = async (req, res) => {
    const userId = req.user.userId;
    const gigs = await getBiddedGigsActivity(userId);
    return res.status(200).json({
        success: true,
        gigs,
    });
};
//# sourceMappingURL=user.controller.js.map