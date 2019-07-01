import adsService from "./ads.service";
import partnerService from '../partner/partner.service';
import { accountType } from "../account/account.constants";

export default {
    applyToAdd(req, res, next) {
        const { adId } = req.body;
        const { account } = req;

        const update = {
            $addToSet: {
                candidates: account.profile
            }
        }
        
        adsService.edit(adId, update)
            .then((ad) => {
                ad.applied = true;
                
                return res.json({ data: ad });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    getUniversityPartnersAds(req, res, next) {
        const { account } = req;

        account.getProfile()
            .then((accountProfile) => partnerService.findByUniversityId(accountProfile.university))
            .then((partners) => {
                const partnersIds = partners.map((partner) => partner.id);
                const conditions = {
                    isActive: true,
                    author: { $in: partnersIds }
                };

                // TODO: SKIP, LIMIT, SORT, PROJECTION
                return adsService.getAll(conditions);
            })
            .then(([partnersAds, totalPartnersAds]) => {
                const ads = partnersAds.map((ad) => {
                    return Object.assign({}, ad, {
                        applied: ad.candidates.some((candidate) => candidate.equals(account.profile.id))
                    });
                });

                const data = {
                    list: ads,
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
    getAdById(req, res, next) {
        const { adId } = req.params;
        const { account } = req;

        if (account.type === accountType.student) {
            adsService.getById(adId)
                .then((ad) => {
                    ad.applied = ad.candidates.some((candidate) => candidate.equals(account.profile));
                    
                    delete ad.candidates;

                    return res.json({ data: ad });
                })
                .catch((error) => next({ message: error.errmsg || error }));
        } else {
            adsService.getById(adId, ['-candidates'])
                .then((ad) => {
                    return res.json({ data: ad });
                })
                .catch((error) => next({ message: error.errmsg || error }));
        }
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