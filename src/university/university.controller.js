import universityService from './university.service';

export default {
    follow(req, res, next) {
        const { account, body } = req;

        return universityService.follow(account.profile, body.followingId)
            .then((followedUniversityProfile) => {
                let data = null;

                if (followedUniversityProfile) {
                    return account.getProfile()
                        .then((followerProfile) => {
                            followerProfile.universities.push(followedUniversityProfile.id);
                            followerProfile.save();
                            
                            data = followedUniversityProfile.toObject();
                            data.isFollowed = followedUniversityProfile.partners.indexOf(followerProfile.id) > -1;
                            delete data.partners;

                            return res.json({ data });
                        });
                }

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    preview(req, res, next) {
        const { account } = req;
        const projection = ['-account', '-students'];

        return universityService.findByName(req.params.name, projection)
            .then((foundUniversity) => {
                const data = foundUniversity.toObject();
                data.isFollowed = foundUniversity.partners.indexOf(account.profile) > -1;
                delete data.partners;

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    me(req, res, next) {
        return universityService.findById(req.account.profile)
            .then((foundUniversity) => {
                const data = foundUniversity;
                
                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));

    },
    updateMyProfile(req, res, next) {
        let update = req.body;

        if (req.files && req.files.length) {
            update = {
                avatar: req.files[0].location
            };
        }

        return universityService.findByIdAndUpdate(req.account.profile, update)
            .then((updatedUniversity) => {
                const data = updatedUniversity;

                return res.json({ data });
            })
            .catch((error) => next({ message: error.errmsg || error }));
    },
    // AS SOON AS THE SYSTEM STABILITY CONFIRMED WILL BE DELETED
    // findByName(req, res) {
    //     const { name } = req.params;

    //     return universityService.findByName(name, ['name', 'rating', 'avatar'])
    //         .then((foundUniversities) => {
    //             return res.json({
    //                 data: foundUniversities
    //             });
    //         });
    // },
    filterByName(req, res) {
        const { name, page, limit } = req.query;

        if (!name) {
            return res.json({
                data: {
                    list: [],
                    total: 0
                }
            });
        }

        return universityService.filterByName(name, page, limit, ['name', 'rating', 'avatar'])
            .then(([foundUniversities, foundUniversitiesTotal]) => {
                const data = {
                    list: foundUniversities,
                    total: foundUniversitiesTotal
                };

                return res.json({ data });
            });
    },
    create(req, res) {
        const { name, countryCode } = req.body;
        
        return universityService.create(name, countryCode, req.account.id)
            .then((createdUniversity) => {
                req.account.setProfile(createdUniversity.id)
                    .then((savedAccount) => {
                        const data = { account: savedAccount };
                        
                        return res.json({ data });
                    });
            });
    }
};