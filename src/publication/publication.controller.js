import publicationService from './publication.service';
import { accountType } from '../account/account.constants';
import { broadcastToRoom } from '../socket';

export default {
    list(req, res, next) {
        const { account } = req;
        const { sort, skip, limit } = req.query;

        switch (account.type) {
            case accountType.student: {
                req.account.getProfile()
                    .then((accountWithProfile) => {
                        const accountProfile = accountWithProfile.profileId;
                        const populate = ['publisher'];
                        
                        return publicationService.getList(accountProfile.universityId, sort, skip, limit, populate);
                    })
                    .then((publications) => {
                        const data = {
                            list: publications,
                            hasMore: skip + limit <= publications.length
                        };

                        return res.json({ data });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
                break;
            }
            case accountType.university: {
                const populate = ['publisher'];

                publicationService.getList(account.profileId, sort, skip, limit, populate)
                    .then((publications) => {
                        const data = {
                            list: publications,
                            hasMore: skip + limit <= publications.length
                        };

                        return res.json({ data });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
                break;
            }
            default: return next({ message: 'Invalid account type' });
        }
    },
    create(req, res, next) {
        const { content } = req.body;
        const { type, id } = req.account;

        return req.account.getProfile()
            .then((accountWithProfile) => {
                const publisherId = accountWithProfile.profileId.id;
                let feedId = null;

                switch (type) {
                    case accountType.student: {
                        feedId = accountWithProfile.profileId.universityId;
                        break;
                    }
                    case accountType.university: {
                        feedId = accountWithProfile.profileId.id;
                        break;
                    }
                    default: throw new Error('Invalid account type');
                }

                return publicationService.create(type, publisherId, feedId, content)
                    .then((publicationsUpdated) => {
                        broadcastToRoom(feedId, id, 'update');
                        const data = {
                            list: publicationsUpdated,
                            hasMore: true
                        };

                        return res.json({ data });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
            })

    }
};