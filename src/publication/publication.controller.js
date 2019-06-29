import publicationService from './publication.service';
import { accountType } from '../account/account.constants';
import { broadcastToRoom } from '../socket';

export default {
    list(req, res, next) {
        const { account } = req;
        let { sort, skip, limit } = req.query;
        
        sort = sort === undefined ? 'createdAt' : sort;
        skip = skip === undefined ? 0 : skip;
        limit = limit === undefined ? 0 : limit;
        
        switch (account.type) {
            case accountType.student: {
                req.account.getProfile()
                    .then((accountProfile) => {
                        const populate = ['publisher'];

                        return publicationService.getList(accountProfile.university, sort, skip, limit, populate);
                    })
                    .then(([publications, count]) => {
                        const data = {
                            list: publications,
                            hasMore: count > skip + limit
                        };

                        return res.json({ data });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
                break;
            }
            case accountType.university: {
                const populate = ['publisher'];

                publicationService.getList(account.profile, sort, skip, limit, populate)
                    .then(([publications, count]) => {
                        const data = {
                            list: publications,
                            hasMore: count > skip + limit
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
            .then((profile) => {
                const publisherId = profile.id;
                let feedId = null;

                switch (type) {
                    case accountType.student: {
                        feedId = profile.university;
                        break;
                    }
                    case accountType.university: {
                        feedId = profile.id;
                        break;
                    }
                    default: throw new Error('Invalid account type');
                }

                const skip = 0; 
                const limit = 10;
                const sort = 'createdAt';
                const populate = ['publisher'];
                // TODO: Get created publication index and returns getList createdPublicationIndex + limit
                return publicationService.create(type, publisherId, feedId, content)
                    .then(() => {
                        return publicationService.getList(feedId, sort, skip, limit, populate);
                    })
                    .then(([publications, count]) => {
                        broadcastToRoom(feedId, id, 'update');

                        const data = {
                            list: publications,
                            hasMore: count > skip + limit
                        };

                        return res.json({ data });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
            });

    }
};