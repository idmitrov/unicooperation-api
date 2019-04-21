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
                        return publicationService.getList(
                            accountWithProfile.profileId.universityId,
                            'createdAt',
                            0,
                            10,
                            ['publisher']
                        )
                    })
                    .then((publications) => {
                        return res.json({ data: publications });
                    });
                break;
            }
            case accountType.university: {
                // TODO: Get params from releaseEvents.query
                publicationService.getList(
                    account.profileId,
                    'createdAt',
                    0,
                    10,
                    ['publisher']
                )
                    .then((publications) => {
                        return res.json({ data: publications });
                    });
                break;
            }
            default: throw new Error('Invalid account type');
        }
    },
    create(req, res, next) {
        const { content } = req.body;
        const { type } = req.account;

        return req.account.getProfile()
            .then((accountWithProfile) => {
                const publisherId = accountWithProfile.profileId.id;

                return publicationService.create(type, publisherId, content)
                    .then((createdPublication) => {
                        return res.json({ data: createdPublication });
                    })
                    .catch((error) => next({ message: error.errmsg || error }));
            })

    }
};