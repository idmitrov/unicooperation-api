import adsService from "./ads.service";
import partnerService from '../partner/partner.service';

export default {
    getUniversityPartnersAds(req, res, next) {
        const { account } = req;

        account.getProfile()
            .then((accountProfile) => partnerService.findByUniversityId(accountProfile.university))
            .then((partners) => {
                const partnersIds = partners.map((partner) => partner.id);
                
                return adsService.getAll({
                    isActive: true,
                    author: { $in: partnersIds }
                });
            })
            .then(([partnersAds, totalPartnersAds]) => {
                const data = {
                    list: partnersAds,
                    total: totalPartnersAds
                };
                
                res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    getMyAds(req, res, next) {
        const { account } = req;
        const conditions = { isActive: true, author: account.profile };

        adsService.getAll(conditions)
            .then(([ads, total]) => {
                const data = {
                    list: ads,
                    total: total
                };

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    createNewAd(req, res, next) {
        const { title, content }= req.body;
        const author = req.account.profile;

        adsService.create(title, content, author)
            .then((createdAd) => {
                return res.json({ data: createdAd });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    editExistingAd(req, res, next) {
        const { title, content } = req.body;
        const { adId } = req.params;

        adsService.edit(adId, title, content)
            .then((editedAd) => {
                return res.json({ data: editedAd });
            })
            .catch((error) => {
                next({ message: error.errmsg || error })
            });
    }
}