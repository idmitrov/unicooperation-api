import publicationService from './publication.service';
import { accountType } from '../account/account.constants';

export default {
    list(req, res, next) {
        const { account } = req;

        switch (account.type) {
            case accountType.student: {
                req.account.getProfile()
                    .then((accountWithProfile) => {
                        // TODO: Get params from releaseEvents.query
                        const accountProfile = accountWithProfile.profileId;

                        return publicationService.getList(accountProfile.universityId, 'createdAt', 0, 10, ['publisher']);
                    })
                    .then((publications) => {
                        return res.json({ data: publications });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
                break;
            }
            case accountType.university: {
                // TODO: Get params from releaseEvents.query
                publicationService.getList(account.profileId, 'createdAt', 0, 10, ['publisher'])
                    .then((publications) => {
                        return res.json({ data: publications });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
                break;
            }
            default: return next({ message: 'Invalid account type' });
        }
    },
    create(req, res, next) {
        const { content } = req.body;
        const { type } = req.account;

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
                        return res.json({ data: publicationsUpdated });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
            })

    }
};